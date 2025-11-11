# API Setup Guide

This guide provides detailed instructions for setting up all required API accounts and obtaining the necessary credentials.

## Overview

The Telegram Image Generator Bot requires three main API services:

1. **Telegram Bot API** - For receiving voice messages and sending images
2. **Google Gemini API** - For speech-to-text transcription and AI processing
3. **Hugging Face API** - For AI image generation

## Telegram Bot API Setup

### Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a chat and send `/newbot`
3. Follow the prompts:
   - Choose a name for your bot (e.g., "Image Generator Bot")
   - Choose a username ending in "bot" (e.g., "image_generator_bot")
4. BotFather will provide your bot token - **save this securely!**

### Step 2: Configure Bot Settings

```
/setdescription - Set a description for your bot
/setabouttext - Set the about text
/setuserpic - Set a profile picture
```

### Step 3: Bot Permissions

Your bot automatically has these permissions:
- Receive messages in private chats
- Receive messages in groups (if added)
- Send messages and photos
- Download files

### Security Notes
- **Never share your bot token publicly**
- Store the token in n8n's credential store
- Consider using environment variables for production deployments

## Google Gemini API Setup

### Step 1: Create Google Account

If you don't have a Google account, create one at [accounts.google.com](https://accounts.google.com).

### Step 2: Access Google AI Studio

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Accept the terms of service

### Step 3: Generate API Key

1. Click on **"Get API key"** in the top navigation
2. Select **"Create API key in new project"** (or choose existing project)
3. Your API key will be generated
4. **Copy and save the API key securely**

### Step 4: API Quotas and Limits

**Free Tier Limits:**
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

**Usage Guidelines:**
- Monitor your usage in the Google Cloud Console
- Consider upgrading to paid tier for production use
- Voice files are typically small, so token usage is minimal

### Step 5: Enable Required APIs

The following APIs are automatically enabled:
- Generative Language API (for transcription)
- AI Platform API (for chat models)

## Hugging Face API Setup

### Step 1: Create Hugging Face Account

1. Go to [Hugging Face](https://huggingface.co/)
2. Click **"Sign Up"**
3. Complete registration with email verification

### Step 2: Generate Access Token

1. Go to **Settings** → **Access Tokens**
2. Click **"New token"**
3. Configure your token:
   - **Name**: "n8n-image-generator" (or similar)
   - **Type**: "Read"
   - **Scope**: Leave default (read access to public repos)
4. Click **"Generate token"**
5. **Copy and save the token securely**

### Step 3: Model Access

**Flux Schnell Model:**
- Available at: `black-forest-labs/flux-schnell`
- No special access required
- Free tier available through Inference API

**Rate Limits:**
- Free tier: Limited requests per day
- Paid tier: Higher limits and faster processing
- Monitor usage in your Hugging Face dashboard

### Step 4: Alternative Models

You can also use these models by updating the HTTP Request node:

```json
{
  "name": "model",
  "value": "stabilityai/stable-diffusion-2-1"
}
```

**Popular Alternatives:**
- `runwayml/stable-diffusion-v1-5`
- `stabilityai/stable-diffusion-2-1`
- `prompthero/openjourney`

## API Configuration in n8n

### Telegram Credentials

```json
{
  "name": "Telegram account",
  "type": "telegramApi",
  "data": {
    "accessToken": "YOUR_TELEGRAM_BOT_TOKEN"
  }
}
```

### Google Gemini Credentials

```json
{
  "name": "Google Gemini(PaLM) Api account",
  "type": "googlePalmApi", 
  "data": {
    "apiKey": "YOUR_GOOGLE_GEMINI_API_KEY"
  }
}
```

### Hugging Face Configuration

Update the HTTP Request node header:
```json
{
  "name": "Authorization",
  "value": "Bearer YOUR_HUGGING_FACE_TOKEN"
}
```

## Testing API Connections

### Test Telegram Bot

1. Send `/start` to your bot in Telegram
2. The bot should be online (green dot visible)
3. Try sending a simple message

### Test Google Gemini

Create a test workflow:
1. Add a Gemini node
2. Use a simple text prompt
3. Execute to verify API access

### Test Hugging Face

Create a test HTTP request:
1. Use the same endpoint and headers
2. Send a simple prompt
3. Verify image generation works

## Troubleshooting

### Common Issues

**Telegram Bot Not Responding:**
- Verify bot token is correct
- Check bot is not blocked
- Ensure bot has message permissions

**Google Gemini Errors:**
- Verify API key is active
- Check quota limits
- Ensure billing is enabled (if using paid tier)

**Hugging Face Failures:**
- Verify token permissions
- Check rate limits
- Try different models if one is unavailable

### Error Messages

**"Unauthorized" (401):**
- Check API key/token is correct
- Verify credentials are properly configured

**"Too Many Requests" (429):**
- API rate limit exceeded
- Wait before retrying
- Consider upgrading to paid tier

**"Model Not Found" (404):**
- Check model name is spelled correctly
- Verify model is publicly available
- Try alternative models

## Security Best Practices

### Credential Management

- **Never commit API keys to version control**
- Use n8n's built-in credential store
- Rotate tokens regularly
- Monitor API usage for unusual activity

### Access Control

- Limit bot permissions to minimum required
- Use separate credentials for development/production
- Enable two-factor authentication on all accounts
- Regular security audits of API usage

### Monitoring

- Set up billing alerts for paid APIs
- Monitor rate limits and usage patterns
- Log API errors for troubleshooting
- Regular backup of important credentials

## Production Considerations

### Scaling

- **Rate Limiting**: Implement queue systems for high volume
- **Load Balancing**: Distribute API calls across multiple keys
- **Caching**: Cache transcriptions and generated images
- **Monitoring**: Set up alerting for API failures

### Cost Optimization

- **Efficient Prompts**: Optimize prompts to reduce token usage
- **Batch Processing**: Group similar requests when possible
- **Model Selection**: Choose cost-effective models for your use case
- **Usage Monitoring**: Regular review of API costs and usage

This completes the API setup guide. Each service should now be properly configured and ready for use with the n8n workflow.