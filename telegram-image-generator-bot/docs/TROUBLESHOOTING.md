# Troubleshooting Guide

This guide helps you diagnose and fix common issues with the Telegram Image Generator Bot.

## Quick Diagnostic Checklist

Before diving into specific issues, run through this checklist:

- [ ] Workflow is **activated** in n8n
- [ ] All **credentials are configured** and saved
- [ ] **API keys are valid** and not expired
- [ ] Bot has **necessary permissions** in Telegram
- [ ] **No rate limits** exceeded on any service

## Common Issues and Solutions

### 🤖 Bot Not Responding to Voice Messages

#### Symptoms
- Voice messages sent to bot receive no response
- No workflow execution visible in n8n

#### Diagnostic Steps
1. **Check Workflow Status**
   ```
   n8n → Workflows → Check if "Active" toggle is ON
   ```

2. **Test with Text Message**
   - Send a regular text message to your bot
   - If bot doesn't respond to text either, it's a Telegram configuration issue

3. **Verify Webhook Connection**
   ```
   n8n → Executions → Look for recent executions
   ```

#### Solutions

**Solution 1: Reactivate Workflow**
1. Turn workflow OFF and ON again
2. Wait 30 seconds between toggling
3. Test with a new voice message

**Solution 2: Check Bot Token**
1. Go to @BotFather in Telegram
2. Send `/token` to get your bot's token
3. Compare with the token in n8n credentials
4. Update if they don't match

**Solution 3: Bot Permissions**
1. Ensure bot can read messages in the chat
2. For group chats, make bot an admin
3. Check privacy settings with @BotFather

### 🎤 Transcription Failures

#### Symptoms
- Workflow executes but stops at transcription
- Error: "Could not transcribe audio file"
- Empty or garbled transcription results

#### Diagnostic Steps
1. **Check Voice Message Quality**
   - File size (should be < 20MB)
   - Duration (< 1 minute works best)
   - Background noise level

2. **Test Google Gemini API**
   ```
   Create simple test workflow with Gemini node
   Use text input to verify API key works
   ```

#### Solutions

**Solution 1: Voice Message Guidelines**
- Speak clearly and slowly
- Minimize background noise
- Keep messages under 30 seconds
- Use supported languages (English works best)

**Solution 2: Update Gemini API Key**
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Generate a new API key
3. Update credentials in n8n
4. Test again

**Solution 3: Check API Quotas**
1. Visit Google Cloud Console
2. Check Generative AI API usage
3. Verify you haven't exceeded free tier limits
4. Consider upgrading if needed

### 🎨 Image Generation Problems

#### Symptoms
- Transcription works but no image generated
- Error: "Failed to generate image"
- Very slow image generation

#### Diagnostic Steps
1. **Check Hugging Face API**
   ```
   Test URL: https://router.huggingface.co/nebius/v1/images/generations
   Verify token format: Bearer YOUR_TOKEN
   ```

2. **Examine the Prompt**
   - Look at n8n execution logs
   - Check what text is being sent to image generation
   - Ensure prompt is appropriate and clear

#### Solutions

**Solution 1: Update Hugging Face Token**
1. Go to Hugging Face Settings → Access Tokens
2. Create a new token with "Read" permissions
3. Update the HTTP Request node authorization header:
   ```
   Bearer YOUR_NEW_TOKEN
   ```

**Solution 2: Try Alternative Models**
Update the model in HTTP Request node:
```json
{
  "name": "model",
  "value": "runwayml/stable-diffusion-v1-5"
}
```

**Solution 3: Improve Prompt Quality**
- Add descriptive words: "high quality", "detailed", "professional"
- Avoid harmful or inappropriate content
- Use simple, clear descriptions

### ⚡ Performance Issues

#### Symptoms
- Very slow execution (> 2 minutes)
- Timeouts during processing
- Workflow fails randomly

#### Solutions

**Solution 1: Optimize Voice Messages**
- Keep voice messages under 15 seconds
- Speak at normal pace
- Avoid very complex image descriptions

**Solution 2: Add Error Handling**
1. Add "Wait" nodes between operations
2. Set appropriate timeouts in HTTP Request
3. Add retry logic for failed operations

**Solution 3: Monitor API Limits**
- Check rate limits for all services
- Consider upgrading to paid tiers
- Implement queue system for high volume

## Advanced Troubleshooting

### Enable Debug Logging

1. **n8n Settings**
   ```
   Settings → Log Level → Set to "debug"
   ```

2. **Workflow Execution**
   - Run workflow manually
   - Check each node's input/output
   - Look for error messages in logs

### Test Individual Components

#### Test Telegram Connection
```javascript
// Create simple webhook test
{
  "method": "POST",
  "url": "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe"
}
```

#### Test Google Gemini
```javascript
// Simple text completion test
{
  "prompt": "Hello, world!",
  "model": "gemini-pro"
}
```

#### Test Hugging Face
```bash
curl -X POST https://router.huggingface.co/nebius/v1/images/generations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "a red apple", "model": "black-forest-labs/flux-schnell"}'
```

### Common Error Codes

| Error Code | Service | Meaning | Solution |
|------------|---------|---------|----------|
| 401 | Any API | Unauthorized | Check API key/token |
| 429 | Any API | Rate limited | Wait and retry |
| 404 | Hugging Face | Model not found | Check model name |
| 400 | Google Gemini | Invalid request | Check audio format |
| 413 | Telegram | File too large | Use smaller voice files |

### Workflow Validation

#### Required Node Configuration

1. **Telegram Trigger**
   - Updates: `["channel_post"]` or `["message"]`
   - Credentials: Valid bot token

2. **Get a file** 
   - Resource: `file`
   - File ID: `={{ $json.channel_post.voice.file_id }}`

3. **Transcribe a recording**
   - Model: `models/gemini-2.5-flash`
   - Input Type: `binary`

4. **HTTP Request**
   - Method: `POST`
   - URL: Hugging Face endpoint
   - Authorization: `Bearer YOUR_TOKEN`

## Getting Help

### Before Asking for Help

1. **Check this troubleshooting guide** thoroughly
2. **Search existing issues** on GitHub
3. **Test with minimal examples** to isolate the problem
4. **Gather relevant information**:
   - n8n version and deployment type
   - Exact error messages
   - Workflow execution logs
   - Voice message characteristics

### Where to Get Help

1. **GitHub Issues** - For bugs and feature requests
2. **n8n Community Forum** - For general n8n questions
3. **API Documentation** - For service-specific issues:
   - [Telegram Bot API](https://core.telegram.org/bots/api)
   - [Google Gemini API](https://ai.google.dev/docs)
   - [Hugging Face API](https://huggingface.co/docs/api-inference)

### Information to Include

When asking for help, always include:

```markdown
**Environment:**
- n8n version: 
- Deployment: (cloud/docker/npm)
- OS: 

**Issue:**
- What you expected:
- What actually happened:
- Error messages:

**Steps taken:**
- [ ] Checked credentials
- [ ] Verified API quotas
- [ ] Tested individual components
- [ ] Reviewed troubleshooting guide
```

## Prevention Tips

### Regular Maintenance

- **Monitor API quotas** monthly
- **Rotate API keys** quarterly  
- **Update workflow** when new n8n versions release
- **Backup credentials** securely

### Best Practices

- **Test changes** in development environment first
- **Monitor execution logs** regularly
- **Keep documentation** updated
- **Set up alerting** for critical failures

This covers most common issues you might encounter. If you're still experiencing problems after following this guide, please open an issue with detailed information about your specific situation.