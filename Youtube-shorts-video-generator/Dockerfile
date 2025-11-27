# Use the official n8n image as base
FROM n8nio/n8n:latest

# Set working directory
WORKDIR /home/node

# Copy workflow file
COPY Video\ generator.json /tmp/workflow.json

# Copy any custom nodes or configurations
COPY package.json ./

# Switch to root to install additional packages
USER root

# Install FFmpeg and other dependencies
RUN apk add --no-cache \
    ffmpeg \
    imagemagick \
    curl \
    wget \
    && rm -rf /var/cache/apk/*

# Create necessary directories
RUN mkdir -p /home/node/.n8n/workflows \
    && mkdir -p /tmp/media \
    && chown -R node:node /home/node/.n8n \
    && chown -R node:node /tmp/media

# Switch back to node user
USER node

# Set environment variables
ENV N8N_USER_FOLDER=/home/node/.n8n
ENV N8N_BASIC_AUTH_ACTIVE=true
ENV N8N_BASIC_AUTH_USER=admin
ENV N8N_BASIC_AUTH_PASSWORD=changeme123

# Expose the n8n port
EXPOSE 5678

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:5678/healthz || exit 1

# Start n8n
CMD ["n8n", "start"]