# Telegram Image Generator Bot

A powerful n8n workflow that converts Telegram voice messages into AI-generated images. The bot transcribes voice messages using Google Gemini, processes the text with an AI agent, and generates images using Hugging Face's Flux model.

## Features

- 🎤 **Voice to Text**: Transcribes voice messages using Google Gemini 2.5 Flash
- 🤖 **AI Processing**: Processes transcribed text with an intelligent AI agent
- 🎨 **Image Generation**: Creates images using Flux Schnell model from Black Forest Labs
- 📱 **Telegram Integration**: Seamless bot integration with Telegram channels/chats
- ⚡ **Real-time Processing**: Automated workflow triggered by voice messages

## How It Works

1. **Voice Message Reception**: Bot receives a voice message in a Telegram channel/chat
2. **File Download**: Downloads the voice file from Telegram
3. **Transcription**: Converts audio to text using Google Gemini
4. **AI Enhancement**: Processes the text through an AI agent for optimization
5. **Image Generation**: Sends the processed prompt to Hugging Face Flux model
6. **Response**: Sends the generated image back to the same Telegram chat

## Prerequisites

Before setting up this workflow, you'll need:

- [n8n](https://n8n.io/) instance (cloud or self-hosted)
- Telegram Bot Token
- Google Gemini API Key
- Hugging Face API Token

## Setup Instructions

### 1. Create API Accounts

#### Telegram Bot
1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Create a new bot with `/newbot`
3. Save your bot token

#### Google Gemini API
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create an API key
3. Save your API key

#### Hugging Face
1. Create account at [Hugging Face](https://huggingface.co/)
2. Generate an API token in your settings
3. Save your token

### 2. Import Workflow

1. Copy the workflow JSON from `Telegram_Image_Generator_Workflow.json`
2. In n8n, go to **Workflows** > **Import from JSON**
3. Paste the JSON content

### 3. Configure Credentials

#### Telegram API
- **Name**: `Telegram account`
- **Access Token**: Your Telegram bot token

#### Google Gemini API  
- **Name**: `Google Gemini(PaLM) Api account`
- **API Key**: Your Google Gemini API key

#### Hugging Face API
- **Authorization Header**: `Bearer YOUR_HF_TOKEN`
- Replace `YOUR_HF_TOKEN` with your actual Hugging Face token

### 4. Activate Workflow

1. Save the workflow
2. Activate it by clicking the toggle switch
3. Your bot is now ready to receive voice messages!

## Usage

1. Add your bot to a Telegram channel or start a private chat
2. Send a voice message describing what image you want
3. The bot will:
   - Transcribe your voice message
   - Process the text for better image generation
   - Generate an image based on your description
   - Send the image back to the chat

## Workflow Components

### Nodes Overview

| Node | Function |
|------|----------|
| **Telegram Trigger** | Listens for new voice messages in channels |
| **Get a file** | Downloads voice files from Telegram |
| **Transcribe a recording** | Converts audio to text using Gemini |
| **AI Agent** | Enhances text for better image prompts |
| **Google Gemini Chat Model** | Language model for the AI agent |
| **Code in JavaScript** | Processes output formatting |
| **HTTP Request** | Calls Hugging Face image generation API |
| **Extract from File** | Extracts image data from API response |
| **Send a photo message** | Sends generated image back to Telegram |

### Models Used

- **Speech-to-Text**: Google Gemini 2.5 Flash
- **Text Processing**: Google Gemini Chat Model
- **Image Generation**: Black Forest Labs Flux Schnell

## Customization

### Modify Image Generation
To use a different image model, update the HTTP Request node:
```json
{
  "name": "model",
  "value": "your-preferred-model"
}
```

### Adjust AI Agent Behavior
Modify the AI Agent node's prompt to change how text is processed:
```json
{
  "promptType": "define",
  "text": "Your custom prompt here",
  "options": {}
}
```

### Change Trigger Settings
Update the Telegram Trigger to listen for different update types:
```json
{
  "updates": ["channel_post", "message"],
  "additionalFields": {}
}
```

## Troubleshooting

### Common Issues

1. **Bot not responding to voice messages**
   - Check if the workflow is activated
   - Verify Telegram bot token is correct
   - Ensure bot has necessary permissions in the channel

2. **Transcription errors**
   - Verify Google Gemini API key
   - Check if audio quality is sufficient
   - Ensure audio is in a supported format

3. **Image generation failing**
   - Verify Hugging Face API token
   - Check API rate limits
   - Ensure the prompt is appropriate

### Logs and Debugging

Enable detailed logging in n8n to troubleshoot issues:
1. Go to **Settings** > **Log Level**
2. Set to `debug` for detailed information
3. Check execution logs for specific error messages

## Security Considerations

- **API Keys**: Never commit API keys to version control
- **Tokens**: Store all credentials securely in n8n's credential store
- **Bot Permissions**: Grant minimal required permissions to your Telegram bot
- **Rate Limits**: Be aware of API rate limits for all services

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review n8n's [documentation](https://docs.n8n.io/)
3. Open an issue in this repository

## Acknowledgments

- [n8n](https://n8n.io/) for the automation platform
- [Google Gemini](https://ai.google.dev/) for speech-to-text capabilities
- [Hugging Face](https://huggingface.co/) for image generation models
- [Black Forest Labs](https://blackforestlabs.ai/) for the Flux model