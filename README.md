# ShopHub - E-Commerce Website

A modern e-commerce web application built with HTML, CSS, and JavaScript, containerized with Docker and automated with GitHub Actions CI/CD.

## Project Overview

ShopHub is a responsive e-commerce platform offering a wide range of products including electronics, fashion, home goods, and gaming accessories. This project demonstrates both web development best practices and DevOps methodologies.

## Prerequisites

### System Requirements
- **Docker**: Version 20.10 or higher
  - [Install Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: Version 1.29 or higher (included with Docker Desktop)
- **Git**: For cloning and version control
- **Node.js**: 18+ (for local development, optional)

### Verify Installation
```bash
docker --version
docker-compose --version
git --version
```

## Getting Started

### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shophub-main
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Main site: http://localhost:80
   - Log viewer: http://localhost:8080

4. **Stop containers**
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker directly

1. **Build the Docker image**
   ```bash
   docker build -t shophub:latest .
   ```

2. **Run the container**
   ```bash
   docker run -p 80:80 --name shophub-app shophub:latest
   ```

3. **View running containers**
   ```bash
   docker ps
   ```

4. **Stop the container**
   ```bash
   docker stop shophub-app
   docker rm shophub-app
   ```

## Project Structure

```
shophub-main/
├── index.html           # Main landing page
├── registration.html    # User registration page
├── products.html        # Products and orders page
├── index.js             # Main application logic
├── style.css            # Application styling
├── Dockerfile           # Docker image configuration
├── docker-compose.yml   # Multi-service orchestration
├── .dockerignore         # Files to exclude from Docker builds
├── nginx.conf           # Nginx web server configuration
├── README.md            # Project documentation
└── .github/
    └── workflows/
        └── ci.yml       # CI/CD pipeline configuration
```

## Features

- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🛍️ **E-Commerce Functionality**: Product browsing, user registration, order management
- 🐳 **Dockerized**: Easy deployment with container technology
- 🔄 **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions
- 🔒 **Branch Protection**: Quality gates before merging to main
- 🏥 **Health Checks**: Container health monitoring

## CI/CD Pipeline

The project includes automated workflows defined in `.github/workflows/ci.yml`:

### Workflow Steps
1. **Validate**: Checks HTML/CSS validity
2. **Build**: Constructs Docker image
3. **Security Scan**: Scans image for vulnerabilities (using Trivy)
4. **Status Checks**: Blocks merging to main if tests fail

### Branch Protection Rules

Main branch is protected with:
- ✅ Require status checks to pass before merging
- ✅ Require pull request reviews
- ✅ Enforce up-to-date base branches

## Docker Architecture

### Services

#### Web Service
- **Image**: Built from custom Dockerfile
- **Base**: Alpine Linux with Nginx
- **Port**: 80
- **Health Check**: HTTP GET to root path every 30s

#### Log Viewer (Bonus)
- **Image**: Nginx Alpine
- **Port**: 8080
- **Purpose**: Log visualization and monitoring

### Network
All services communicate via `shophub-network` bridge network.

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs web

# Rebuild image
docker-compose build --no-cache
```

### Port already in use
Change port mappings in `docker-compose.yml`:
```yaml
ports:
  - "8000:80"  # Changed from 80:80
```

### Permission denied
On Linux/Mac, you may need to add your user to the docker group:
```bash
sudo usermod -aG docker $USER
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit Pull Request

The CI/CD pipeline will automatically run on your PR. All checks must pass before merging.

## License

This project is part of an educational Docker and CI/CD course.

## Support

For issues or questions, please open an issue on GitHub.