# LinkedIn Automation Posting

An n8n workflow that automates LinkedIn post creation and publishing using AI-powered content generation.

## Overview

This project provides an intelligent chatbot that:
- Receives user messages through a chat interface
- Uses Google Gemini AI to generate LinkedIn post content
- Automatically formats and publishes posts to LinkedIn
- Maintains conversation memory for context-aware interactions

## Features

- **AI-Powered Content Generation**: Uses Google Gemini Chat Model for intelligent post creation
- **Automated LinkedIn Publishing**: Direct integration with LinkedIn API for seamless posting
- **Chat Interface**: Interactive chatbot experience with memory retention
- **Content Formatting**: Automatic text formatting for LinkedIn posts
- **Public Visibility**: Posts are published with public visibility settings

## Workflow Components

### Core Nodes
1. **Chat Trigger**: Initiates the workflow when a chat message is received
2. **AI Agent**: Processes user input and generates responses
3. **Google Gemini Chat Model**: Provides AI-powered content generation
4. **Structured Output Parser**: Ensures consistent output formatting
5. **Code Node**: Handles text formatting (newline escaping)
6. **LinkedIn API Integration**: Two HTTP requests for user info and post publishing
7. **Simple Memory**: Maintains conversation context

### API Endpoints Used
- `GET https://api.linkedin.com/v2/userinfo` - Retrieves user information
- `POST https://api.linkedin.com/v2/ugcPosts` - Publishes posts to LinkedIn

## Prerequisites

Before setting up this workflow, you'll need:

1. **n8n Installation**: A running n8n instance
2. **LinkedIn API Access**: 
   - LinkedIn Developer Account
   - API credentials with posting permissions
3. **Google Gemini API**: API key for Google's Gemini model
4. **Required Credentials**:
   - LinkedIn Access Token (HTTP Header Auth)
   - Google Gemini API credentials

## Setup Instructions

### 1. LinkedIn API Setup
1. Create a LinkedIn Developer Account
2. Create a new app and obtain API credentials
3. Configure OAuth 2.0 permissions for posting
4. Generate an access token with required scopes

### 2. Google Gemini API Setup
1. Create a Google Cloud account
2. Enable the Gemini API
3. Generate API credentials

### 3. n8n Configuration
1. Import the workflow JSON file into your n8n instance
2. Configure credentials:
   - Add LinkedIn Access Token as HTTP Header Auth
   - Add Google Gemini API credentials
3. Test the webhook endpoint
4. Activate the workflow

## Usage

1. Start a chat session with the bot
2. Send a message describing what kind of LinkedIn post you want
*<div style="font-family: 'Courier New'">
# Example Prompt: 
You are a LinkedIn post writer. You will be given a title and your task is to create an engaging LinkedIn post based on that title.

Your post should:

Begin with a compelling hook related to the title Include 3-4 paragraphs of informative content End with a question to encourage engagement Include 4-6 relevant hashtags Use appropiate emojis in between The content must be more human-written rather than AI generated. The content should be professional yet casual targetting Devops engineers and AI aspirants, also use appropriate keywords for maximum reach.

Important formatting requirements:

Format all paragraphs with proper newline characters (\n\n) between them Ensure the text is properly escaped for JSON Do not use double quote ("") in response or any special character Do not put asterisk Keep the overall length appropriate for LinkedIn (under 3000 characters)

Now, create a LinkedIn post based on the following title: What is the role of AI in Devops and how it can be misused if not handled properly?</div>*

3. The AI will generate appropriate content
4. The post will be automatically formatted and published to LinkedIn
5. Continue the conversation for additional posts

## Workflow Details

### Input Schema
```json
{
  "type": "object",
  "properties": {
    "post": {
      "type": "string"
    }
  }
}
```

### Post Structure
```json
{
  "author": "urn:li:person:{user_id}",
  "lifecycleState": "PUBLISHED",
  "specificContent": {
    "com.linkedin.ugc.ShareContent": {
      "shareCommentary": {
        "text": "{generated_content}"
      },
      "shareMediaCategory": "NONE"
    }
  },
  "visibility": {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  }
}
```

## Configuration

### Environment Settings
- **Execution Order**: v1
- **Timezone**: Asia/Kolkata
- **Error Handling**: Continue on error for HTTP requests
- **Caller Policy**: Workflows from same owner

### Memory Configuration
The workflow uses buffer window memory to maintain conversation context, allowing for more natural interactions.

## Security Considerations

- Store API credentials securely in n8n credential management
- Use environment variables for sensitive configuration
- Regularly rotate API tokens
- Monitor API usage and rate limits

## Troubleshooting

### Common Issues
1. **Authentication Errors**: Verify LinkedIn API credentials and permissions
2. **Rate Limiting**: Check LinkedIn API rate limits
3. **Content Formatting**: Ensure proper text escaping for JSON
4. **Webhook Issues**: Verify webhook URL accessibility

### Error Handling
The workflow includes error handling for HTTP requests to ensure graceful failure recovery.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:
- Check the troubleshooting section
- Review n8n documentation
- Submit issues via GitHub

## Acknowledgments

- Built with [n8n](https://n8n.io/) workflow automation
- Powered by Google Gemini AI
- Integrated with LinkedIn API