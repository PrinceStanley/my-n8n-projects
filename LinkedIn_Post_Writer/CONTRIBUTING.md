# Contributing to LinkedIn Automation Posting

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Basic understanding of n8n workflow automation
- Familiarity with LinkedIn API
- Knowledge of JavaScript/JSON
- Understanding of OAuth 2.0 and API authentication

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Set up your development environment with n8n
4. Import the workflow JSON file
5. Configure test credentials

## How to Contribute

### Reporting Issues
- Use the GitHub issue tracker
- Provide detailed descriptions
- Include steps to reproduce
- Add relevant screenshots or logs
- Tag issues appropriately

### Suggesting Enhancements
- Open an issue with the enhancement label
- Describe the feature and its benefits
- Provide use cases and examples
- Consider backward compatibility

### Code Contributions

#### Workflow Changes
1. Test your changes thoroughly in n8n
2. Export the updated workflow as JSON
3. Ensure proper formatting and validation
4. Update documentation as needed

#### Documentation Updates
1. Keep README.md current with changes
2. Update setup instructions if needed
3. Add examples for new features
4. Maintain consistent formatting

### Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow existing code patterns
   - Add comments for complex logic
   - Test thoroughly

3. **Commit Your Changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Use descriptive titles
   - Provide detailed descriptions
   - Reference related issues
   - Include testing information

### Commit Message Guidelines

Follow conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add support for LinkedIn article posting
fix: resolve authentication token refresh issue
docs: update API setup instructions
```

## Testing Guidelines

### Required Testing
1. **Workflow Validation**
   - Import workflow successfully
   - All nodes validate without errors
   - Connections work properly

2. **API Integration**
   - Test with valid credentials
   - Verify error handling
   - Check rate limit compliance

3. **Content Generation**
   - Test various input types
   - Verify output formatting
   - Check character limits

4. **End-to-End Testing**
   - Complete workflow execution
   - Successful LinkedIn posting
   - Memory retention functionality

### Test Environment Setup
- Use test LinkedIn developer accounts
- Set up separate API credentials for testing
- Use n8n test/development instance
- Never test on production data

## Code Style Guidelines

### JSON Formatting
- Use consistent indentation (2 spaces)
- Maintain proper structure
- Validate JSON syntax
- Use meaningful node names

### Documentation Style
- Use clear, concise language
- Provide examples where helpful
- Keep formatting consistent
- Update table of contents when needed

### Node Configuration
- Use descriptive node names
- Add helpful comments in code nodes
- Configure error handling appropriately
- Set reasonable timeouts

## Security Considerations

### API Credentials
- Never commit credentials to repository
- Use environment variables or n8n credential system
- Regularly rotate test credentials
- Follow principle of least privilege

### Data Privacy
- Respect user data privacy
- Follow LinkedIn's terms of service
- Implement proper error handling
- Avoid logging sensitive information

## Community Guidelines

### Communication
- Be respectful and professional
- Help newcomers get started
- Share knowledge and experiences
- Provide constructive feedback

### Collaboration
- Coordinate on larger changes
- Discuss breaking changes in issues
- Consider impact on existing users
- Maintain backward compatibility when possible

## Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors list

## Questions and Support

- Open GitHub issues for questions
- Check existing documentation first
- Provide context and details
- Be patient with responses

## Release Process

### Version Management
- Follow semantic versioning
- Tag releases appropriately
- Maintain changelog
- Document breaking changes

### Release Notes
- Summarize new features
- List bug fixes
- Note any breaking changes
- Provide migration guidance

Thank you for contributing to making LinkedIn automation more accessible and powerful!