# Changelog

All notable changes to the Telegram Image Generator Bot workflow will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of Telegram Image Generator Bot workflow
- Voice message transcription using Google Gemini 2.5 Flash
- AI-powered prompt enhancement for better image generation
- Image generation using Hugging Face Flux Schnell model
- Automatic image delivery back to Telegram chat
- Support for Telegram channel posts and private messages
- Comprehensive setup and documentation
- Error handling for common failure scenarios

### Features
- **Voice-to-Image Pipeline**: Complete automation from voice input to image output
- **Multi-Service Integration**: Seamless connection between Telegram, Google Gemini, and Hugging Face
- **Real-time Processing**: Immediate response to voice messages
- **AI Enhancement**: Intelligent prompt optimization for better image results
- **Easy Setup**: Step-by-step configuration guide
- **Flexible Deployment**: Works with both cloud and self-hosted n8n instances

### Technical Details
- Built for n8n workflow automation platform
- Uses Google Gemini 2.5 Flash for speech-to-text conversion
- Leverages Google Gemini Chat Model for AI agent processing
- Integrates with Hugging Face Inference API
- Supports Black Forest Labs Flux Schnell image generation model
- Includes JavaScript code for output formatting and processing

### Documentation
- Complete README with setup instructions
- Quick setup guide for rapid deployment
- Troubleshooting section for common issues
- Contributing guidelines for community participation
- MIT license for open-source usage

## [Unreleased]

### Planned Features
- Support for multiple image generation models
- Batch processing for multiple voice messages
- Image style presets and customization options
- Multi-language transcription support
- Usage analytics and monitoring
- Rate limiting and quota management
- Custom AI agent prompts configuration
- Integration with additional image generation services

### Known Issues
- Large voice files (>5MB) may cause timeout issues
- Some accents may not transcribe accurately
- Rate limiting not implemented for high-volume usage
- No support for image editing or modification requests

## Future Versions

### Roadmap
- **v1.1.0**: Enhanced error handling and retry logic
- **v1.2.0**: Multiple image model support
- **v1.3.0**: Advanced prompt engineering features
- **v2.0.0**: Complete redesign with modular architecture

### Community Requests
- Integration with Discord and other messaging platforms
- Support for video message processing
- Image enhancement and upscaling features
- Custom style transfer capabilities
- Voice command shortcuts and presets

---

## How to Contribute to Changelog

When making changes to the workflow:

1. Add your changes to the [Unreleased] section
2. Use the following categories:
   - **Added** for new features
   - **Changed** for changes in existing functionality
   - **Deprecated** for soon-to-be removed features
   - **Removed** for now removed features
   - **Fixed** for any bug fixes
   - **Security** for vulnerability fixes

3. Follow the format: `- Description of change (#issue-number)`
4. Move items to a version section when releasing

## Version History Reference

- **Major versions (X.0.0)**: Breaking changes, major new features
- **Minor versions (0.X.0)**: New features, backwards compatible
- **Patch versions (0.0.X)**: Bug fixes, small improvements