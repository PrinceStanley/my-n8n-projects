# LinkedIn Automation Posting - Setup Guide

This comprehensive guide will walk you through setting up the LinkedIn automation posting workflow from start to finish.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [LinkedIn API Setup](#linkedin-api-setup)
3. [Google Gemini API Setup](#google-gemini-api-setup)
4. [n8n Installation and Configuration](#n8n-installation-and-configuration)
5. [Workflow Import and Setup](#workflow-import-and-setup)
6. [Testing and Validation](#testing-and-validation)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- [ ] A LinkedIn account with developer access
- [ ] A Google Cloud account
- [ ] An n8n instance (cloud or self-hosted)
- [ ] Basic understanding of API authentication
- [ ] Access to manage webhooks and credentials

## LinkedIn API Setup

### Step 1: Create LinkedIn Developer Account

1. Visit [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Sign in with your LinkedIn account
3. Complete developer verification if required

### Step 2: Create a New Application

1. Click "Create App" in the developer portal
2. Fill in the application details:
   - **App name**: LinkedIn Automation Posting
   - **LinkedIn Page**: Your company/personal page
   - **App description**: AI-powered LinkedIn post automation
   - **App logo**: Upload a suitable logo
   - **Privacy policy URL**: Your privacy policy
   - **Terms of service URL**: Your terms of service

3. Review and submit for verification

### Step 3: Configure API Permissions

1. Navigate to the "Products" tab
2. Request access to:
   - **Sign In with LinkedIn using OpenID Connect**
   - **Share on LinkedIn**
   - **Marketing Developer Platform** (if available)

3. Wait for approval (can take 1-7 days)

### Step 4: Obtain API Credentials

1. Go to the "Auth" tab
2. Note down:
   - **Client ID**
   - **Client Secret**
3. Add redirect URLs for OAuth flow
4. Generate access tokens using OAuth 2.0 flow

### Step 5: Generate Access Token

For testing purposes, you can use LinkedIn's OAuth 2.0 flow:

```bash
# Authorization URL
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope=openid%20profile%20w_member_social

# Exchange code for token
POST https://www.linkedin.com/oauth/v2/accessToken
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code={code}&client_id={client_id}&client_secret={client_secret}&redirect_uri={redirect_uri}
```

## Google Gemini API Setup

### Step 1: Go to Google AI Studio:
Navigate to the Google AI Studio website and log in with your Google account. 
### Step 2: Get an API key:
In the left-side navigation panel, find and click on "Get API key". 
### Step 3: Create a new key:
Click the "Create API key" button, and then select "Create API key in new project" (or choose an existing project from the list). 
### Step 4: Copy the key:
Once the API key is generated, copy the string of characters to your clipboard. It's important to store this key in a secure location and not share it publicly. 


## n8n Installation and Configuration

### Option 1: n8n Cloud

1. Visit [n8n.cloud](https://n8n.cloud/)
2. Sign up for an account
3. Create a new workspace
4. Access your n8n instance

### Option 2: Self-Hosted with Docker

```bash
# Pull n8n image
docker pull n8nio/n8n

# Run n8n container
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### Option 3: Self-Hosted with npm

```bash
# Install n8n globally
npm install n8n -g

# Start n8n
n8n start
```

### Option 4: Self-hosted using helm chart on K8s cluster
```bash
# Pull the n8n helm repo
helm pull oci://8gears.container-registry.com/library/n8n

# Extract the file
tar xzf n8n-1.0.16.tgz
cd n8n/

# Edit the values.yaml as per your requirements
vi values.yaml

# Install the n8n helm chart
helm upgrade --install -create-namespace n8n -n n8n --set global.valkey.password="<enter-valkey-password-here>" -f values.yaml .
```

## Workflow Import and Setup

### Step 1: Import Workflow

1. Open your n8n instance
2. Click the "+" to create new workflow
3. Click "Import from File"
4. Select the `LInkedin Automation Posting.json` file
5. Click "Import"

### Step 2: Configure LinkedIn Credentials

1. Click on any HTTP Request node connected to LinkedIn API
2. Click on "Credential for LinkedIn Access Token"
3. Create new credential:
   - **Name**: LinkedIn Access Token
   - **Authentication Method**: Header Auth
   - **Name**: Authorization
   - **Value**: Bearer {your_access_token}

### Step 3: Configure Google Gemini Credentials

1. Click on "Google Gemini Chat Model" node
2. Create new credential:
   - **Name**: Google Gemini API
   - **API Key**: {your_gemini_api_key}

### Step 4: Configure Webhook

1. Click on "When chat message received" node
2. Copy the webhook URL
3. Configure your chat interface to send messages to this URL

### Step 5: Test Connections

1. Click "Test" on each credential
2. Verify all connections are working
3. Check node configurations

## Testing and Validation

### Step 1: Test Individual Nodes

1. **Test Chat Trigger**:
   ```bash
   curl -X POST {webhook_url} \
     -H "Content-Type: application/json" \
     -d '{"chatInput": "Create a post about AI automation"}'
   ```

2. **Test LinkedIn User Info**:
   - Execute the first HTTP Request node
   - Verify user information is retrieved

3. **Test AI Generation**:
   - Execute the AI Agent node
   - Check generated content quality

### Step 2: End-to-End Testing

1. Send a test message to the webhook
2. Monitor workflow execution
3. Check LinkedIn for published post
4. Verify post content and formatting

### Step 3: Error Testing

1. Test with invalid credentials
2. Test with rate limit scenarios
3. Test with malformed input
4. Verify error handling works

## Troubleshooting

### Common Issues

#### LinkedIn API Issues

**Error: Invalid Access Token**
- Solution: Regenerate access token
- Check token expiration
- Verify OAuth scopes

**Error: Rate Limit Exceeded**
- Solution: Implement rate limiting
- Add delays between requests
- Monitor API usage

**Error: Insufficient Permissions**
- Solution: Request additional API products
- Check application approval status
- Verify OAuth scopes

#### Google Gemini Issues

**Error: API Key Invalid**
- Solution: Regenerate API key
- Check project billing status
- Verify API is enabled

**Error: Quota Exceeded**
- Solution: Check quota limits
- Upgrade billing plan
- Implement usage monitoring

#### n8n Issues

**Error: Workflow Import Failed**
- Solution: Check JSON syntax
- Verify n8n version compatibility
- Import nodes individually

**Error: Webhook Not Accessible**
- Solution: Check firewall settings
- Verify n8n public access
- Test webhook URL manually

### Debug Steps

1. **Enable Debug Mode**:
   - Turn on execution logging
   - Check node outputs
   - Monitor error messages

2. **Check Network Connectivity**:
   - Test API endpoints manually
   - Verify SSL certificates
   - Check DNS resolution

3. **Validate Configurations**:
   - Double-check all credentials
   - Verify API permissions
   - Test with minimal payload

### Getting Help

- Check the [troubleshooting section](README.md#troubleshooting) in README
- Search existing GitHub issues
- Create detailed bug reports
- Join n8n community forums

## Production Deployment

### Security Checklist

- [ ] Use environment variables for credentials
- [ ] Enable HTTPS for webhooks
- [ ] Implement proper logging
- [ ] Set up monitoring and alerts
- [ ] Regular credential rotation
- [ ] Backup workflow configurations

### Monitoring

- Set up health checks
- Monitor API usage
- Track error rates
- Alert on failures

### Maintenance

- Regular updates to dependencies
- Monitor API changes
- Review and rotate credentials
- Update documentation

## Next Steps

After successful setup:

1. Customize the AI prompts for your use case
2. Add additional content types (images, videos)
3. Implement content scheduling
4. Add analytics and reporting
5. Scale to multiple LinkedIn accounts

For advanced configuration and customization, refer to the main [README.md](README.md) file.