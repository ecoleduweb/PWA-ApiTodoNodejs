#!/bin/bash

# TODO API Setup Script
# This script sets up the entire project including dependencies, database, and configuration

set -e  # Exit on any error

echo "🚀 Starting TODO API Setup..."

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

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Node.js $(node -v) is installed"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    print_success "npm $(npm -v) is installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    npm install
    print_success "Dependencies installed successfully"
}

# Setup environment file
setup_env() {
    print_status "Setting up environment configuration..."
    
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_warning "Created .env file from .env.example"
        print_warning "Please update the database configuration in .env file"
        
        # Prompt for database configuration
        echo ""
        echo "Please provide your MariaDB/MySQL database configuration:"
        read -p "Database Host (default: localhost): " DB_HOST
        DB_HOST=${DB_HOST:-localhost}
        
        read -p "Database Port (default: 3306): " DB_PORT
        DB_PORT=${DB_PORT:-3306}
        
        read -p "Database User (default: root): " DB_USER
        DB_USER=${DB_USER:-root}
        
        read -s -p "Database Password: " DB_PASSWORD
        echo ""
        
        read -p "Database Name (default: todo_api): " DB_NAME
        DB_NAME=${DB_NAME:-todo_api}
        
        read -p "Server Port (default: 3001): " PORT
        PORT=${PORT:-3001}
        
        # Update .env file
        sed -i "s/DB_HOST=.*/DB_HOST=$DB_HOST/" .env
        sed -i "s/DB_PORT=.*/DB_PORT=$DB_PORT/" .env
        sed -i "s/DB_USER=.*/DB_USER=$DB_USER/" .env
        sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASSWORD/" .env
        sed -i "s/DB_NAME=.*/DB_NAME=$DB_NAME/" .env
        sed -i "s/PORT=.*/PORT=$PORT/" .env
        
        print_success "Environment configuration updated"
    else
        print_success "Environment file already exists"
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    # Source the .env file
    if [ -f ".env" ]; then
        export $(grep -v '^#' .env | xargs)
    fi
    
    # Check if MariaDB/MySQL is accessible
    print_status "Testing database connection..."
    
    if command -v mysql &> /dev/null; then
        if mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1;" &> /dev/null; then
            print_success "Database connection successful"
            
            # Create database if it doesn't exist
            mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;" 2>/dev/null
            print_success "Database '$DB_NAME' is ready"
        else
            print_warning "Could not connect to database. Please ensure MariaDB/MySQL is running and credentials are correct."
        fi
    else
        print_warning "MySQL client not found. Please ensure MariaDB/MySQL is installed."
    fi
}

# Build the application
build_app() {
    print_status "Building TypeScript application..."
    npm run build
    print_success "Application built successfully"
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    if [ -f ".env" ]; then
        export $(grep -v '^#' .env | xargs)
    fi
    
    npm run db:generate
    npm run db:migrate
    print_success "Database migrations completed"
}

# Install PM2 globally (optional)
install_pm2() {
    print_status "Checking PM2 installation..."
    
    if ! command -v pm2 &> /dev/null; then
        print_warning "PM2 not found. Installing PM2 globally..."
        npm install -g pm2
        print_success "PM2 installed successfully"
    else
        print_success "PM2 is already installed"
    fi
}

# Create systemd service (for Linux)
create_service() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        print_status "Creating systemd service..."
        
        read -p "Do you want to create a systemd service? (y/N): " create_service_answer
        
        if [[ $create_service_answer =~ ^[Yy]$ ]]; then
            sudo tee /etc/systemd/system/todo-api.service > /dev/null <<EOF
[Unit]
Description=TODO API Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=$(pwd)
ExecStart=/usr/bin/node dist/server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF
            
            sudo systemctl daemon-reload
            sudo systemctl enable todo-api
            
            print_success "Systemd service created and enabled"
            print_status "Use 'sudo systemctl start todo-api' to start the service"
        fi
    fi
}

# Main setup process
main() {
    echo ""
    echo "======================================"
    echo "       TODO API Setup Script"
    echo "======================================"
    echo ""
    
    check_node
    check_npm
    install_dependencies
    setup_env
    build_app
    setup_database
    run_migrations
    install_pm2
    create_service
    
    echo ""
    echo "======================================"
    print_success "Setup completed successfully! 🎉"
    echo "======================================"
    echo ""
    echo "Next steps:"
    echo "1. Review and update the .env file if needed"
    echo "2. Start the development server: npm run dev"
    echo "3. Start the production server: npm start"
    echo "4. Access the API documentation: http://localhost:3001/swagger"
    echo ""
    echo "For production deployment:"
    echo "- Use PM2: pm2 start dist/server.js --name todo-api"
    echo "- Use systemd: sudo systemctl start todo-api"
    echo ""
}

# Run main function
main "$@"