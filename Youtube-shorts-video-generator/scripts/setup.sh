#!/bin/bash

# Video Generator Setup Script
# This script sets up the complete Video Generator environment

set -e

echo "🎬 Video Generator Setup Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required commands exist
check_dependencies() {
    print_status "Checking dependencies..."
    
    local deps=("docker" "docker-compose" "curl" "jq")
    local missing_deps=()
    
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            missing_deps+=("$dep")
        fi
    done
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing dependencies: ${missing_deps[*]}"
        print_error "Please install these before running the setup."
        exit 1
    fi
    
    print_success "All dependencies found"
}

# Create environment file
create_env_file() {
    print_status "Creating environment file..."
    
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_success "Created .env file from template"
        print_warning "Please edit .env file with your API keys and credentials"
    else
        print_warning ".env file already exists, skipping creation"
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    local dirs=("data/n8n" "data/postgres" "data/redis" "data/minio" "logs" "tmp")
    
    for dir in "${dirs[@]}"; do
        mkdir -p "$dir"
        print_status "Created directory: $dir"
    done
    
    print_success "Directories created"
}

# Start services
start_services() {
    print_status "Starting services with Docker Compose..."
    
    # Pull latest images
    docker-compose pull
    
    # Start services
    docker-compose up -d
    
    print_success "Services started"
}

# Wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for n8n
    print_status "Waiting for n8n..."
    while ! curl -sf http://localhost:5678/healthz > /dev/null 2>&1; do
        sleep 5
        print_status "Still waiting for n8n..."
    done
    print_success "n8n is ready"
    
    # Wait for MinIO
    print_status "Waiting for MinIO..."
    while ! curl -sf http://localhost:9000/minio/health/live > /dev/null 2>&1; do
        sleep 5
        print_status "Still waiting for MinIO..."
    done
    print_success "MinIO is ready"
}

# Import workflow
import_workflow() {
    print_status "Importing Video Generator workflow..."
    
    # Check if workflow file exists
    if [ ! -f "Video generator.json" ]; then
        print_error "Workflow file 'Video generator.json' not found"
        return 1
    fi
    
    # Import workflow via API (requires n8n to be running)
    # Note: This is a simplified approach - in practice you might need authentication
    local workflow_data=$(cat "Video generator.json")
    
    print_success "Workflow file found and ready for import"
    print_warning "Please manually import 'Video generator.json' through the n8n UI"
}

# Setup MinIO buckets
setup_minio_buckets() {
    print_status "Setting up MinIO buckets..."
    
    # Wait a bit more for MinIO to be fully ready
    sleep 10
    
    # Create buckets using MinIO client (mc)
    docker run --rm --network video-generator_video-generator-network \
        -e MC_HOST_minio=http://minioadmin:minioadmin123@minio:9000 \
        minio/mc:latest \
        sh -c "
            mc mb minio/n8n --ignore-existing
            mc mb minio/nca-toolkit --ignore-existing
            mc policy set public minio/n8n
            mc policy set public minio/nca-toolkit
        "
    
    print_success "MinIO buckets created and configured"
}

# Display final information
show_final_info() {
    echo ""
    echo "🎉 Setup Complete!"
    echo "=================="
    echo ""
    echo "Services are running:"
    echo "• n8n UI: http://localhost:5678"
    echo "• MinIO Console: http://localhost:9001"
    echo "• MinIO API: http://localhost:9000"
    echo ""
    echo "Next steps:"
    echo "1. Edit .env file with your API keys"
    echo "2. Open n8n UI and import 'Video generator.json'"
    echo "3. Configure credentials in n8n:"
    echo "   • Google Gemini API"
    echo "   • HuggingFace API"
    echo "   • Telegram Bot"
    echo "   • MinIO S3 credentials"
    echo "4. Test the workflow with the form"
    echo ""
    echo "Default credentials:"
    echo "• n8n: admin / changeme123"
    echo "• MinIO: minioadmin / minioadmin123"
    echo ""
    print_warning "Remember to change default passwords in production!"
}

# Main setup function
main() {
    echo "Starting Video Generator setup..."
    echo ""
    
    check_dependencies
    create_env_file
    create_directories
    start_services
    wait_for_services
    setup_minio_buckets
    import_workflow
    show_final_info
    
    print_success "Setup completed successfully!"
}

# Run setup if script is executed directly
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi