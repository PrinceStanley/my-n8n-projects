# Quick Setup Guide

This guide will help you get the Telegram Image Generator Bot running in just a few minutes.

## Step 1: Prerequisites Checklist

- [ ] n8n instance (cloud or self-hosted)
- [ ] Telegram Bot Token
- [ ] Google Gemini API Key  
- [ ] Hugging Face API Token

## Step 2: Get Your API Keys

### Telegram Bot Token
1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the prompts
3. Copy your bot token (looks like: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

### Google Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click "Get API key"
3. Create a new API key
4. Copy your API key

### Hugging Face Token
1. Sign up at [Hugging Face](https://huggingface.co/)
2. Go to Settings > Access Tokens
3. Create a new token with "Read" permissions
4. Copy your token

## Step 3: Import the Workflow

1. Download `Telegram_Image_Generator_Workflow.json` from this repository
2. Open your n8n instance
3. Go to **Workflows** → **Import from JSON**
4. Upload or paste the JSON content
5. Click **Import**

## Step 4: Configure Credentials

### Add Telegram Credentials
1. Click on any Telegram node in the workflow
2. Click **Create New** next to "Telegram API"
3. Name: `Telegram account`
4. Access Token: Paste your Telegram bot token
5. Save

### Add Google Gemini Credentials
1. Click on the "Transcribe a recording" node
2. Click **Create New** next to "Google Gemini API"
3. Name: `Google Gemini(PaLM) Api account`
4. API Key: Paste your Gemini API key
5. Save

### Update Hugging Face Token
1. Click on the "HTTP Request" node
2. Find the Authorization header
3. Replace the bearer token with your Hugging Face token:
   ```
   Bearer YOUR_HUGGING_FACE_TOKEN
   ```

## Step 5: Test the Bot

1. **Save** the workflow
2. **Activate** it (toggle switch in top-right)
3. Add your bot to a Telegram channel or start a private chat
4. Send a voice message describing an image
5. Wait for the generated image!

## Example Voice Commands

Try saying:
- "A sunset over mountains"
- "A cute cat wearing a wizard hat"
- "A futuristic city with flying cars"
- "A peaceful lake surrounded by trees"

## Troubleshooting

### Bot not responding?
- Check if workflow is activated
- Verify all credentials are saved
- Ensure bot has permission to read messages in the channel

### Transcription not working?
- Speak clearly and avoid background noise
- Try shorter voice messages (under 30 seconds)
- Check Google Gemini API quota

### No image generated?
- Verify Hugging Face token is correct
- Check if prompt is appropriate (no harmful content)
- Try simpler descriptions

## Need Help?

Check the main [README.md](README.md) for detailed documentation or open an issue if you're stuck!