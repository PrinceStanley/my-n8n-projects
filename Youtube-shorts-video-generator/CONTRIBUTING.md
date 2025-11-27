# Contributing to Video Generator

Thank you for your interest in contributing to the Video Generator project! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js 18+ and npm 8+
- Docker and Docker Compose
- Basic understanding of n8n workflows
- Familiarity with AI APIs (Google Gemini, HuggingFace)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/video-generator.git
   cd video-generator
   ```

2. **Start development environment**
   ```bash
   docker-compose up -d
   ```

3. **Import the workflow**
   - Open n8n at http://localhost:5678
   - Import `Video generator.json`
   - Configure credentials (see Setup Guide)

4. **Test the workflow**
   - Trigger the form webhook
   - Monitor execution logs
   - Verify output quality

## How to Contribute

### Reporting Bugs
1. Check existing issues first
2. Use the bug report template
3. Include:
   - n8n version
   - Workflow execution logs
   - Expected vs actual behavior
   - Steps to reproduce

### Suggesting Features
1. Open an issue with the feature request template
2. Describe the use case and benefits
3. Propose implementation approach
4. Consider backward compatibility

### Code Contributions

#### Workflow Changes
1. **Fork and branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes in n8n**
   - Modify nodes and connections
   - Test thoroughly with various inputs
   - Document parameter changes

3. **Export updated workflow**
   ```bash
   npm run export
   ```

4. **Commit and push**
   ```bash
   git add Video\ generator.json
   git commit -m "feat: add new feature description"
   git push origin feature/your-feature-name
   ```

5. **Create pull request**
   - Use the PR template
   - Include before/after screenshots
   - Describe testing performed

#### Infrastructure Changes
- Update Docker configurations
- Modify environment variables
- Update documentation accordingly
- Test deployment scenarios

### Code Style and Standards

#### Workflow Design
- Use descriptive node names
- Add comments for complex logic
- Implement proper error handling
- Follow n8n best practices

#### Documentation
- Update README.md for new features
- Include setup instructions
- Add troubleshooting sections
- Use clear, concise language

#### Commit Messages
Follow conventional commit format:
```
type(scope): description

feat: add new video animation effects
fix: resolve audio sync issues
docs: update API configuration guide
refactor: optimize image processing pipeline
```

## Testing Guidelines

### Manual Testing
1. **Form Input Validation**
   - Test all required fields
   - Verify dropdown options
   - Test edge cases

2. **Workflow Execution**
   - Monitor each node output
   - Check error handling
   - Verify file uploads/downloads

3. **Output Quality**
   - Review generated videos
   - Check audio synchronization
   - Validate caption placement

### Automated Testing
- Workflow validation scripts
- API endpoint tests
- Integration tests for external services

## Release Process

### Version Management
- Follow semantic versioning (semver)
- Update package.json version
- Tag releases in git

### Workflow Updates
1. Test in development environment
2. Export final workflow
3. Update documentation
4. Create release notes

## API Integration Guidelines

### Adding New Services
1. **Document requirements**
   - API endpoints and authentication
   - Input/output formats
   - Rate limits and quotas

2. **Implement gracefully**
   - Add proper error handling
   - Include fallback options
   - Monitor service health

3. **Update configuration**
   - Add environment variables
   - Update Docker compose
   - Document setup steps

### Credential Management
- Never commit API keys or secrets
- Use environment variables
- Document credential setup process
- Provide example configurations

## Community Guidelines

### Communication
- Be respectful and constructive
- Ask questions when unclear
- Share knowledge and help others
- Follow the code of conduct

### Issue Management
- Use appropriate labels
- Provide clear descriptions
- Follow up on assigned issues
- Close resolved issues promptly

## Resources

### Documentation
- [n8n Documentation](https://docs.n8n.io/)
- [Google Gemini API](https://ai.google.dev/)
- [HuggingFace API](https://huggingface.co/docs/api-inference/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)

### Tools
- [n8n Community](https://community.n8n.io/)
- [Workflow Examples](https://n8n.io/workflows/)
- [Docker Best Practices](https://docs.docker.com/develop/best-practices/)

## Support

### Getting Help
1. Check existing documentation
2. Search closed issues
3. Ask in discussions
4. Contact maintainers

### Reporting Security Issues
- Email security@yourproject.com
- Do not open public issues
- Include detailed description
- Allow time for response

## Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes
- Project documentation
- Community showcases

Thank you for contributing to Video Generator!