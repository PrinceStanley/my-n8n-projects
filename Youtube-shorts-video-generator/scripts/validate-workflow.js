#!/usr/bin/env node

/**
 * Video Generator Workflow Validation Script
 * Validates the n8n workflow configuration for common issues
 */

const fs = require('fs');
const path = require('path');

const WORKFLOW_FILE = 'Video generator.json';

// Colors for console output
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function loadWorkflow() {
    try {
        if (!fs.existsSync(WORKFLOW_FILE)) {
            throw new Error(`Workflow file '${WORKFLOW_FILE}' not found`);
        }
        
        const workflowData = fs.readFileSync(WORKFLOW_FILE, 'utf8');
        return JSON.parse(workflowData);
    } catch (error) {
        log(`Error loading workflow: ${error.message}`, 'red');
        process.exit(1);
    }
}

function validateWorkflowStructure(workflow) {
    const errors = [];
    const warnings = [];
    
    // Check basic structure
    if (!workflow.name) {
        errors.push('Workflow is missing a name');
    }
    
    if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
        errors.push('Workflow is missing nodes array');
        return { errors, warnings };
    }
    
    if (!workflow.connections) {
        errors.push('Workflow is missing connections object');
    }
    
    return { errors, warnings };
}

function validateNodes(workflow) {
    const errors = [];
    const warnings = [];
    const nodes = workflow.nodes;
    
    // Required node types for the video generator
    const requiredNodeTypes = [
        'n8n-nodes-base.formTrigger',
        '@n8n/n8n-nodes-langchain.chainLlm',
        'n8n-nodes-base.httpRequest',
        'n8n-nodes-base.s3'
    ];
    
    const presentNodeTypes = nodes.map(node => node.type);
    
    for (const requiredType of requiredNodeTypes) {
        if (!presentNodeTypes.includes(requiredType)) {
            warnings.push(`Recommended node type missing: ${requiredType}`);
        }
    }
    
    // Validate individual nodes
    nodes.forEach((node, index) => {
        // Check node structure
        if (!node.id) {
            errors.push(`Node at index ${index} is missing ID`);
        }
        
        if (!node.name) {
            errors.push(`Node at index ${index} is missing name`);
        }
        
        if (!node.type) {
            errors.push(`Node at index ${index} is missing type`);
        }
        
        // Check specific node configurations
        switch (node.type) {
            case 'n8n-nodes-base.formTrigger':
                validateFormTrigger(node, errors, warnings);
                break;
            case '@n8n/n8n-nodes-langchain.chainLlm':
                validateLLMNode(node, errors, warnings);
                break;
            case 'n8n-nodes-base.httpRequest':
                validateHttpRequest(node, errors, warnings);
                break;
            case 'n8n-nodes-base.s3':
                validateS3Node(node, errors, warnings);
                break;
        }
    });
    
    return { errors, warnings };
}

function validateFormTrigger(node, errors, warnings) {
    const params = node.parameters;
    
    if (!params.formFields || !params.formFields.values) {
        errors.push(`Form trigger node '${node.name}' missing form fields`);
        return;
    }
    
    const requiredFields = ['Idea', 'Style', 'Tone', 'Voice', 'Type'];
    const formFields = params.formFields.values.map(field => field.fieldLabel);
    
    for (const requiredField of requiredFields) {
        if (!formFields.includes(requiredField)) {
            errors.push(`Form trigger missing required field: ${requiredField}`);
        }
    }
    
    // Check voice options
    const voiceField = params.formFields.values.find(field => field.fieldLabel === 'Voice');
    if (voiceField && voiceField.fieldOptions && voiceField.fieldOptions.values) {
        const voiceOptions = voiceField.fieldOptions.values.map(opt => opt.option);
        if (voiceOptions.length === 0) {
            warnings.push('Voice field has no options defined');
        }
    }
}

function validateLLMNode(node, errors, warnings) {
    const params = node.parameters;
    
    if (!params.text) {
        warnings.push(`LLM node '${node.name}' missing prompt text`);
    }
    
    if (!params.messages || !params.messages.messageValues) {
        warnings.push(`LLM node '${node.name}' missing system messages`);
    }
}

function validateHttpRequest(node, errors, warnings) {
    const params = node.parameters;
    
    if (!params.url) {
        errors.push(`HTTP Request node '${node.name}' missing URL`);
    }
    
    // Check for localhost URLs that might need configuration
    if (params.url && params.url.includes('localhost') || params.url.includes('192.168.')) {
        warnings.push(`HTTP Request node '${node.name}' uses local URL: ${params.url}`);
    }
    
    // Check for missing authentication
    if (params.url && params.url.includes('huggingface.co') && !params.authentication) {
        warnings.push(`HuggingFace request in '${node.name}' might need authentication`);
    }
}

function validateS3Node(node, errors, warnings) {
    const params = node.parameters;
    
    if (!params.bucketName) {
        errors.push(`S3 node '${node.name}' missing bucket name`);
    }
    
    if (params.operation === 'upload' && !params.fileName) {
        errors.push(`S3 upload node '${node.name}' missing file name`);
    }
}

function validateConnections(workflow) {
    const errors = [];
    const warnings = [];
    
    if (!workflow.connections) {
        errors.push('No connections defined in workflow');
        return { errors, warnings };
    }
    
    const nodeIds = workflow.nodes.map(node => node.id);
    const nodeNames = workflow.nodes.map(node => node.name);
    
    // Check if all referenced nodes in connections exist
    Object.keys(workflow.connections).forEach(sourceName => {
        if (!nodeNames.includes(sourceName)) {
            errors.push(`Connection references non-existent source node: ${sourceName}`);
        }
        
        const connections = workflow.connections[sourceName];
        Object.keys(connections).forEach(outputType => {
            connections[outputType].forEach(connectionGroup => {
                connectionGroup.forEach(connection => {
                    if (!nodeNames.includes(connection.node)) {
                        errors.push(`Connection references non-existent target node: ${connection.node}`);
                    }
                });
            });
        });
    });
    
    return { errors, warnings };
}

function validateCredentials(workflow) {
    const warnings = [];
    const nodes = workflow.nodes;
    
    // Check for nodes that typically require credentials
    const credentialNodes = nodes.filter(node => node.credentials);
    
    if (credentialNodes.length === 0) {
        warnings.push('No credential configurations found - make sure to set up API keys');
    }
    
    credentialNodes.forEach(node => {
        Object.keys(node.credentials).forEach(credType => {
            const cred = node.credentials[credType];
            if (!cred.id || !cred.name) {
                warnings.push(`Node '${node.name}' has incomplete credential configuration for ${credType}`);
            }
        });
    });
    
    return { errors: [], warnings };
}

function generateReport(allErrors, allWarnings) {
    console.log('\n' + '='.repeat(50));
    log('Video Generator Workflow Validation Report', 'blue');
    console.log('='.repeat(50));
    
    if (allErrors.length === 0 && allWarnings.length === 0) {
        log('✅ Workflow validation passed with no issues!', 'green');
        return 0;
    }
    
    if (allErrors.length > 0) {
        log(`\n❌ Found ${allErrors.length} error(s):`, 'red');
        allErrors.forEach((error, index) => {
            log(`${index + 1}. ${error}`, 'red');
        });
    }
    
    if (allWarnings.length > 0) {
        log(`\n⚠️  Found ${allWarnings.length} warning(s):`, 'yellow');
        allWarnings.forEach((warning, index) => {
            log(`${index + 1}. ${warning}`, 'yellow');
        });
    }
    
    console.log('\n' + '='.repeat(50));
    
    if (allErrors.length > 0) {
        log('❌ Validation failed - please fix errors before deployment', 'red');
        return 1;
    } else {
        log('⚠️  Validation passed with warnings - review before deployment', 'yellow');
        return 0;
    }
}

function main() {
    log('🔍 Starting Video Generator workflow validation...', 'blue');
    
    const workflow = loadWorkflow();
    
    log(`Loaded workflow: "${workflow.name}"`, 'blue');
    log(`Found ${workflow.nodes.length} nodes`, 'blue');
    
    const validations = [
        validateWorkflowStructure,
        validateNodes,
        validateConnections,
        validateCredentials
    ];
    
    let allErrors = [];
    let allWarnings = [];
    
    validations.forEach(validationFn => {
        const { errors, warnings } = validationFn(workflow);
        allErrors = allErrors.concat(errors);
        allWarnings = allWarnings.concat(warnings);
    });
    
    const exitCode = generateReport(allErrors, allWarnings);
    process.exit(exitCode);
}

if (require.main === module) {
    main();
}

module.exports = {
    validateWorkflowStructure,
    validateNodes,
    validateConnections,
    validateCredentials
};