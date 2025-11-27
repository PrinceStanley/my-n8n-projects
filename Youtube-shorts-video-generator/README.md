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

## Deployment Details

### Infrastructure Overview
This video generation workflow has been successfully deployed with the following infrastructure setup:

#### Kubernetes Cluster
- **Platform**: Kubernetes v1.30 on Ubuntu VMs
- **Architecture**: 1 Master node + 3 Worker nodes
- **n8n Deployment**: Helm chart installation (v1.116.2)
- **Custom n8n Image**: `rxchi1d/n8n-ffmpeg:1.116.2` (includes FFmpeg support)

#### Jump Box Server (192.168.0.54)
Ubuntu server hosting external services required for k8s cluster access and media processing:

**MinIO Object Storage**
- **Service**: MinIO running on port 9000
- **Buckets**: 
  - `n8n` - Workflow storage
  - `nca-toolkit` - Media processing storage
- **Access**: `http://192.168.0.54:9000`
- **Deployment Reference**: [Object Storage in Kubernetes using MinIO](https://medium.com/@martin.hodges/object-storage-in-your-kubernetes-cluster-using-minio-ad838decd9ce)

**Kokoro FastAPI (Voice Synthesis)**
- **Service**: Kokoro TTS running on port 8880
- **Docker Command**: 
  ```bash
  docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest
  ```
- **Web Interface**: `http://192.168.0.54:8880/web`
- **API Endpoint**: `http://192.168.0.54:8880/v1/audio/speech`
- **Reference**: [Kokoro-FastAPI GitHub](https://github.com/remsky/Kokoro-FastAPI)

**NCA-Toolkit (Media Processing)**
- **Service**: No-Code Architects Toolkit running on port 8080
- **Docker Command**:
  ```bash
  docker run -d -p 8080:8080 \
    -e API_KEY=NaC9Oy048CEFkWqEv925g1S3ez333mgZ \
    -e S3_ENDPOINT_URL=http://192.168.0.54:9000/nca-toolkit \
    -e S3_ACCESS_KEY=JD38jw1GRKHlbJ8aJJxc \
    -e S3_SECRET_KEY=AVW79dbPM5QXofoDWNnnTM3IGbKSmAiyIgj5npuc \
    -e S3_BUCKET_NAME=nca-toolkit \
    -e S3_REGION=us-east-1 \
    -e MAX_QUEUE_LENGTH=10 \
    -e GUNICORN_WORKERS=4 \
    -e GUNICORN_TIMEOUT=300 \
    no-code-architects-toolkit
  ```
- **API Endpoint**: `http://192.168.0.54:8080`
- **Reference**: [NCA-Toolkit GitHub](https://github.com/stephengpope/no-code-architects-toolkit)

### API Endpoints
1. **Media Processing APIs** (NCA-Toolkit on `192.168.0.54:8080`):
   - `/v1/media/metadata` - Audio duration analysis
   - `/v1/image/convert/video` - Image animation
   - `/v1/video/concatenate` - Scene combination
   - `/v1/video/caption` - Subtitle generation

2. **Voice Synthesis API** (Kokoro on `192.168.0.54:8880`):
   - `/v1/audio/speech` - Kokoro TTS endpoint

3. **Storage Services** (MinIO on `192.168.0.54:9000`):
   - MinIO instance with buckets: `n8n`, `nca-toolkit`

## Setup Requirements

### Prerequisites
- Kubernetes cluster (v1.30+) with Helm support
- Ubuntu jump box for external services
- Docker runtime for containerized services
- Google Gemini API credentials
- HuggingFace API access
- Telegram Bot token

### Deployment Configuration
The workflow is configured to work with the deployed infrastructure above. Ensure all IP addresses and ports match your environment:

#### Environment Variables (NCA-Toolkit)
- `API_KEY`: Authentication for media processing APIs
- `S3_ENDPOINT_URL`: MinIO endpoint URL
- `S3_ACCESS_KEY` & `S3_SECRET_KEY`: MinIO credentials
- `S3_BUCKET_NAME`: Storage bucket name
- `MAX_QUEUE_LENGTH`: Processing queue limit
- `GUNICORN_WORKERS`: API worker processes

#### Network Access
- Ensure k8s cluster can reach jump box services (192.168.0.54)
- Configure appropriate firewall rules for ports 8080, 8880, 9000
- Verify DNS resolution or use IP addresses in n8n configuration

## Step-by-Step Setup Guide

Follow this comprehensive setup flow to deploy the complete video generation system from scratch:

### Phase 1: Infrastructure Setup

#### 1. Kubernetes Cluster Preparation
```bash
# Ensure you have a running k8s cluster v1.30+
kubectl cluster-info
kubectl get nodes

# Install Helm if not already installed
curl https://get.helm.sh/helm-v3.12.0-linux-amd64.tar.gz | tar xz
sudo mv linux-amd64/helm /usr/local/bin/
```

#### 2. Ubuntu Jump Box Setup (192.168.0.54)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER
```

### Phase 2: Storage and External Services

#### 3. Deploy MinIO Object Storage
Follow the detailed guide: [Object Storage in Kubernetes using MinIO](https://medium.com/@martin.hodges/object-storage-in-your-kubernetes-cluster-using-minio-ad838decd9ce)

**Create Required Buckets:**
```bash
# Access MinIO console at http://192.168.0.54:9000
# Create buckets: 'n8n' and 'nca-toolkit'
# Note down access credentials for later configuration
```

#### 4. Deploy Kokoro FastAPI (Voice Synthesis)
```bash
# On jump box (192.168.0.54)
docker run -d --name kokoro-tts \
  -p 8880:8880 \
  --restart unless-stopped \
  ghcr.io/remsky/kokoro-fastapi-cpu:latest

# Verify deployment
curl http://192.168.0.54:8880/health
```

#### 5. Deploy NCA-Toolkit (Media Processing)
```bash
# On jump box (192.168.0.54)
docker run -d --name nca-toolkit \
  -p 8080:8080 \
  --restart unless-stopped \
  -e API_KEY=NaC9Oy048CEFkWqEv925g1S3ez333mgZ \
  -e S3_ENDPOINT_URL=http://192.168.0.54:9000/nca-toolkit \
  -e S3_ACCESS_KEY=JD38jw1GRKHlbJ8aJJxc \
  -e S3_SECRET_KEY=AVW79dbPM5QXofoDWNnnTM3IGbKSmAiyIgj5npuc \
  -e S3_BUCKET_NAME=nca-toolkit \
  -e S3_REGION=us-east-1 \
  -e MAX_QUEUE_LENGTH=10 \
  -e GUNICORN_WORKERS=4 \
  -e GUNICORN_TIMEOUT=300 \
  no-code-architects-toolkit

# Verify deployment
curl http://192.168.0.54:8080/health
```

### Phase 3: n8n Deployment

#### 6. Deploy n8n with Custom FFmpeg Image
```bash
# Pull the n8n Helm chart from OCI registry
helm pull oci://8gears.container-registry.com/library/n8n --version 1.0.16

# Extract the chart
tar -xzf n8n-1.0.16.tgz
cd n8n

# Edit the values.yaml file for custom configuration
cat <<EOF > values.yaml
image:
  repository: rxchi1d/n8n-ffmpeg
  tag: "1.116.2"

persistence:
  enabled: true
  size: 20Gi

service:
  type: LoadBalancer
  port: 5678

env:
  - name: N8N_HOST
    value: "your-n8n-domain.com"  # Update with your domain
  - name: WEBHOOK_URL
    value: "https://your-n8n-domain.com/"  # Update with your domain
  - name: GENERIC_TIMEZONE
    value: "UTC"
EOF

# Deploy n8n with Valkey password
# Replace <valkey-password> with your actual password
helm upgrade --install --create-namespace n8n -n n8n \
  --set global.valkey.password="<valkey-password>" \
  -f values.yaml .

# Wait for deployment
kubectl wait --for=condition=available --timeout=300s deployment/n8n -n n8n
```

#### 7. Verify Service Connectivity
```bash
# Test all services are reachable from k8s cluster
kubectl run test-pod --image=curlimages/curl --rm -it --restart=Never -- sh

# Inside the pod, test connectivity:
curl http://192.168.0.54:9000  # MinIO
curl http://192.168.0.54:8080/health  # NCA-Toolkit
curl http://192.168.0.54:8880/health  # Kokoro TTS
```

### Phase 4: API Credentials Setup

#### 8. Obtain Required API Keys
1. **Google Gemini API**: Visit [Google AI Studio](https://aistudio.google.com/) to get API key
2. **HuggingFace API**: Sign up at [HuggingFace](https://huggingface.co/) and get API token
3. **Telegram Bot**: Create bot via [@BotFather](https://t.me/botfather) and get bot token

#### 9. Create Telegram Bot and Get Chat ID
```bash
# After creating bot with @BotFather:
# 1. Start a chat with your bot
# 2. Send any message to the bot
# 3. Get your chat ID:
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates

# Look for "chat":{"id": YOUR_CHAT_ID in the response
```

### Phase 5: n8n Configuration

#### 10. Import and Configure Workflow
1. **Access n8n**: Get the LoadBalancer IP or configure ingress
   ```bash
   kubectl get services n8n
   ```

2. **Import Workflow**: 
   - Open n8n web interface
   - Go to Workflows → Import from File
   - Upload `Video generator.json`

3. **Configure Credentials in n8n**:
   - **Google Gemini**: Add API key as credential
   - **HuggingFace**: Add API token as credential  
   - **MinIO/S3**: Add access key, secret key, endpoint
   - **Telegram Bot**: Add bot token and chat ID
   - **NCA-Toolkit**: Add API key as HTTP header credential

4. **Update Service Endpoints**:
   - Replace all `192.168.0.54` references with your jump box IP
   - Verify all API endpoint URLs in HTTP Request nodes
   - Update MinIO bucket configurations

#### 11. Test Individual Components
1. **Test MinIO Connection**: Upload a test file via n8n
2. **Test Kokoro TTS**: Send a test request to voice synthesis
3. **Test NCA-Toolkit**: Try media processing endpoints
4. **Test Telegram**: Send a test message

### Phase 6: Final Validation

#### 12. End-to-End Test
1. **Activate Workflow**: Enable the main video generation workflow
2. **Get Webhook URL**: Copy the form trigger webhook URL
3. **Submit Test Request**: Fill out the form with simple test data
4. **Monitor Execution**: Watch the workflow execution in n8n
5. **Verify Output**: Check Telegram for the generated video

### Troubleshooting Checklist

**Network Connectivity Issues:**
- Verify k8s cluster can reach jump box (192.168.0.54)
- Check firewall rules for ports 8080, 8880, 9000
- Test DNS resolution or use IP addresses

**Service Health Checks:**
```bash
# MinIO
curl http://192.168.0.54:9000/minio/health/live

# NCA-Toolkit  
curl http://192.168.0.54:8080/health

# Kokoro TTS
curl http://192.168.0.54:8880/health
```

**Common Issues:**
- API rate limits (HuggingFace, Google)
- Storage permissions (MinIO buckets)
- Memory/CPU limits on k8s nodes
- Timeout settings in workflow nodes

## Installation (Legacy Instructions)

For reference, the original installation steps:

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

### Sample Video Example

The following example demonstrates the workflow's capability to generate compelling short-form content:

**Input Parameters:**
- **Idea**: "Man wishes to see his future. He sees his own funeral—and it's happening in 1 hour"
- **Style**: "Time-slip horror" 
- **Tone**: "Urgent, panic"
- **Voice**: "af_jessica"
- **Type**: "Short Form" (1080x1920)
- **Music URL**: (blank)

This input generates a complete vertical video with:
- AI-generated script with urgent pacing and horror elements
- Consistent time-slip horror visual style across scenes
- Jessica voice synthesis with panicked, urgent delivery
- Animated visuals showing the progression from wish to horrifying realization
- Styled captions emphasizing the urgency and horror
- Proper 9:16 aspect ratio for social media platforms

The workflow automatically handles scene transitions, timing synchronization, and creates a cohesive narrative that builds tension from the initial wish to the shocking revelation.

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