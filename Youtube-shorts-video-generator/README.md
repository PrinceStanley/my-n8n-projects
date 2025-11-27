# Video Generator

An AI-powered video creation pipeline built with n8n that automatically generates complete videos from simple text inputs. This workflow transforms ideas into professional-looking videos with AI-generated visuals, voiceovers, and captions.

## Features

- **Form-based Input**: Simple web form for video specifications
- **AI Script Generation**: Uses Google Gemini to create timed video scripts
- **AI Image Generation**: Generates consistent visuals using FLUX model via HuggingFace
- **Voice Synthesis**: Creates natural voiceovers with multiple voice options
- **Video Animation**: Animates static images with zoom effects
- **Auto Captioning**: Adds styled captions to videos
- **Video Concatenation**: Combines scenes into complete videos
- **Telegram Integration**: Delivers final videos via Telegram bot

## Workflow Overview

1. **User Input**: Form submission with idea, style, tone, voice, and type
2. **Script Generation**: AI creates structured, timed video script
3. **Scene Processing**: Each scene is processed in parallel:
   - AI generates scene-specific images
   - Text-to-speech creates voiceovers
   - Images are animated to match audio duration
   - Audio and video are synchronized
4. **Post-processing**: 
   - Individual scenes are concatenated
   - Captions are added with custom styling
   - Final video is delivered via Telegram

## Input Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Idea | Text | Yes | Core concept for the video |
| Style | Text | Yes | Visual style preference |
| Tone | Text | Yes | Narrative tone (e.g., casual, professional) |
| Voice | Dropdown | Yes | Voice selection (af_alloy, af_aoede, af_bella, af_heart, af_jadzia, af_jessica, af_kore) |
| Type | Dropdown | Yes | Video format (Long Form: 1920x1080, Short Form: 1080x1920) |
| Music URL | Text | No | Optional background music |

## Technical Stack

### AI Services
- **Google Gemini 2.0 Flash**: Script generation and scene planning
- **FLUX Schnell (HuggingFace)**: High-quality image generation
- **Kokoro TTS**: Natural voice synthesis

### Media Processing
- **FFmpeg**: Video/audio processing and synchronization
- **Custom Animation API**: Image-to-video conversion with effects
- **Caption API**: Automated subtitle generation and styling

### Infrastructure
- **n8n**: Workflow orchestration
- **MinIO S3**: File storage and asset management
- **Telegram Bot**: Video delivery system

## Setup Requirements

### Prerequisites
- n8n instance (self-hosted or cloud)
- Google Gemini API credentials
- HuggingFace API access
- MinIO or S3-compatible storage
- Telegram Bot token
- FFmpeg installation
- Custom media processing APIs (NCA Toolkit)

### Required Services
1. **Media Processing APIs** (running on `192.168.0.54:8080`):
   - `/v1/media/metadata` - Audio duration analysis
   - `/v1/image/convert/video` - Image animation
   - `/v1/video/concatenate` - Scene combination
   - `/v1/video/caption` - Subtitle generation

2. **Voice Synthesis API** (running on `192.168.0.54:8880`):
   - `/v1/audio/speech` - Kokoro TTS endpoint

3. **Storage Services**:
   - MinIO instance on `192.168.0.54:9000`
   - Buckets: `n8n`, `nca-toolkit`

### Credentials Setup
1. Google Gemini API credentials
2. HuggingFace API key
3. MinIO/S3 access keys
4. Telegram Bot token
5. NCA Toolkit authentication headers

## Installation

1. **Import Workflow**: Load `Video generator.json` into your n8n instance
2. **Configure Credentials**: Set up all required API credentials in n8n
3. **Update Endpoints**: Modify IP addresses to match your infrastructure
4. **Test Form**: Access the generated form webhook URL
5. **Configure Telegram**: Set up bot and chat ID for delivery

## Usage

1. Access the form trigger webhook URL
2. Fill in video parameters:
   - Describe your video idea
   - Select visual style and tone
   - Choose voice and format
3. Submit form and wait for processing
4. Receive completed video via Telegram

## Video Output

The system generates:
- **Resolution**: Automatically sized based on type (1920x1080 or 1080x1920)
- **Frame Rate**: 24 FPS
- **Audio**: High-quality voice synthesis with optional background music
- **Captions**: Styled subtitles with highlight effects
- **Format**: MP4 with H.264 encoding

## Customization

### Caption Styling
```json
{
  "line_color": "#FFFFFF",
  "word_color": "#FFFF00", 
  "all_caps": false,
  "max_words_per_line": 3,
  "font_size": 60,
  "font_family": "The Bold Font",
  "position": "bottom_center",
  "style": "highlight"
}
```

### Animation Settings
- **Zoom Speed**: 2x
- **Frame Rate**: 24 FPS
- **Duration**: Matches audio length

## Architecture

```
Form Input → Script Generation → Scene Processing → Video Assembly → Delivery
     ↓              ↓                    ↓              ↓            ↓
  Validation    AI Analysis        Parallel Tasks    Concatenation  Telegram
                                  ├─ Image Gen
                                  ├─ Voice Gen  
                                  └─ Animation
```

## Troubleshooting

### Common Issues
- **API Timeouts**: Increase wait times in workflow
- **Storage Errors**: Check MinIO credentials and bucket permissions
- **Voice Generation Failures**: Verify TTS service availability
- **Image Generation Issues**: Check HuggingFace API quotas

### Logs and Monitoring
- Monitor n8n execution logs
- Check individual node outputs
- Verify API response codes
- Monitor storage usage

## Contributing

1. Fork the repository
2. Create feature branch
3. Test workflow changes thoroughly
4. Submit pull request with detailed description

## License

[Add your preferred license]

## Support

For issues and questions:
- Check n8n documentation
- Review API service logs
- Test individual workflow nodes
- Verify credential configurations