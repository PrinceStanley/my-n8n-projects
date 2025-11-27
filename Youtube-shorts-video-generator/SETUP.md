# Video Generator Setup Guide

This guide will help you set up the Video Generator workflow from scratch.

## Prerequisites

### System Requirements
- Docker and Docker Compose
- Node.js 18+ and npm 8+
- At least 8GB RAM (16GB recommended)
- 50GB free disk space
- GPU recommended for TTS (optional)

### API Accounts Required
1. **Google Gemini API** - For script generation
2. **HuggingFace API** - For image generation
3. **Telegram Bot** - For video delivery

## Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd video-generator
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys
nano .env
```

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Import Workflow
1. Open http://localhost:5678
2. Login with admin/changeme123
3. Import `Video generator.json`

## Detailed Configuration

### API Keys Setup

#### Google Gemini API
1. Visit https://ai.google.dev/
2. Create API key
3. Add to `.env`: `GOOGLE_GEMINI_API_KEY=your_key_here`

#### HuggingFace API
1. Visit https://huggingface.co/settings/tokens
2. Create access token
3. Add to `.env`: `HUGGINGFACE_API_KEY=your_key_here`

#### Telegram Bot
1. Message @BotFather on Telegram
2. Create new bot with `/newbot`
3. Get bot token and chat ID
4. Add to `.env`

### Service Configuration

#### MinIO Storage
- Access: http://localhost:9001
- Credentials: minioadmin/minioadmin123
- Buckets created automatically

#### n8n Workflow
- Access: http://localhost:5678
- Credentials: admin/changeme123
- Import workflow manually

## Testing

### 1. Validate Setup
```bash
npm run validate
```

### 2. Test Workflow
1. Access form webhook URL from n8n
2. Fill in test data
3. Monitor execution logs
4. Check Telegram for output

## Troubleshooting

### Common Issues

**Services won't start**
- Check Docker is running
- Verify port availability
- Check disk space

**API Authentication Errors**
- Verify API keys in .env
- Check credential setup in n8n
- Test API endpoints manually

**Video Generation Fails**
- Check FFmpeg installation
- Verify media service endpoints
- Monitor resource usage

### Logs
```bash
# View all logs
docker-compose logs -f

# Specific service logs
docker-compose logs -f n8n
docker-compose logs -f minio
```

## Production Deployment

### Security
- Change default passwords
- Use environment secrets
- Enable HTTPS
- Restrict network access

### Scaling
- Use external databases
- Implement load balancing
- Monitor resource usage
- Set up alerting

### Backup
- Regular workflow exports
- Database backups
- Media file backups
- Configuration backups

## Support

For help:
1. Check troubleshooting section
2. Review logs for errors
3. Test individual components
4. Open GitHub issue