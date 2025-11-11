# Contributing to Telegram Image Generator Bot

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. **Check existing issues** to avoid duplicates
2. **Use the issue templates** when available
3. **Provide detailed information**:
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - n8n version and environment details
   - Error messages or logs

### Suggesting Enhancements

For feature requests:

1. **Describe the use case** - why is this needed?
2. **Explain the proposed solution** - how should it work?
3. **Consider alternatives** - what other approaches could work?
4. **Assess impact** - who would benefit from this change?

### Code Contributions

#### Workflow Improvements

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Test your changes** thoroughly
4. **Update documentation** as needed
5. **Submit a pull request**

#### Pull Request Guidelines

- **One feature per PR** - keep changes focused
- **Test thoroughly** - ensure the workflow works end-to-end
- **Update documentation** - README, setup guides, etc.
- **Follow the existing style** - maintain consistency
- **Write clear commit messages**

## Development Setup

### Testing Changes

1. Import the modified workflow into your n8n instance
2. Set up test credentials (use test API keys when possible)
3. Test with various voice inputs and scenarios
4. Verify error handling works correctly

### Documentation Updates

When updating documentation:

- Keep language clear and beginner-friendly
- Include examples where helpful
- Update both README.md and SETUP.md as needed
- Test setup instructions on a fresh environment

## Workflow Modification Guidelines

### Node Configuration

- **Preserve backward compatibility** when possible
- **Document any breaking changes** clearly
- **Use descriptive node names** that explain their purpose
- **Add error handling** where appropriate

### Credential Management

- **Never commit actual API keys** or tokens
- **Use placeholder values** in examples
- **Document required permissions** for each service
- **Test with fresh credentials** to verify setup instructions

### Performance Considerations

- **Optimize for typical use cases** (short voice messages, simple prompts)
- **Consider rate limits** of external APIs
- **Add appropriate timeouts** and retry logic
- **Test with larger files** to ensure stability

## Code of Conduct

### Be Respectful

- Use inclusive language
- Be constructive in feedback
- Respect different perspectives and experience levels
- Help newcomers learn and contribute

### Be Collaborative

- Share knowledge and resources
- Credit others' contributions
- Ask questions when unsure
- Offer help to other contributors

## Recognition

Contributors will be acknowledged in:

- README.md contributors section
- Release notes for significant contributions
- GitHub contributor listings

## Getting Help

If you need assistance:

1. **Check the documentation** first
2. **Search existing issues** for similar questions
3. **Ask in discussions** for general questions
4. **Create an issue** for specific problems

## Release Process

For maintainers:

1. **Test major changes** in a staging environment
2. **Update version numbers** and changelogs
3. **Create release notes** highlighting new features and fixes
4. **Tag releases** following semantic versioning
5. **Update documentation** to reflect changes

## Quality Standards

### Testing Checklist

- [ ] Workflow imports successfully
- [ ] All credentials can be configured
- [ ] Voice transcription works with various accents/languages
- [ ] Image generation produces appropriate results
- [ ] Error handling works for common failure cases
- [ ] Documentation is accurate and up-to-date

### Documentation Standards

- [ ] Setup instructions are clear and complete
- [ ] All prerequisites are listed
- [ ] Troubleshooting section covers common issues
- [ ] Examples are relevant and helpful
- [ ] Links are working and current

Thank you for contributing to make this project better for everyone!