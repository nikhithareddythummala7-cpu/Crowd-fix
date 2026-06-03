#!/bin/bash
# CrowdFix - Quick Start Script

echo "🚀 CrowdFix - Community Problem Reporting System"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Setup Checklist:${NC}"
echo "1. Create MongoDB cluster at mongodb.com/cloud/atlas"
echo "2. Get Cloudinary credentials from cloudinary.com"
echo "3. Copy MongoDB URI and Cloudinary keys"
echo ""

echo -e "${BLUE}🔧 Backend Setup:${NC}"
echo "cd backend"
echo "cp .env.example .env"
echo "# Edit .env with your credentials"
echo "npm install"
echo "npm run dev"
echo ""

echo -e "${BLUE}💻 Frontend Setup (new terminal):${NC}"
echo "cd frontend"
echo "cp .env.example .env"
echo "npm install"
echo "npm start"
echo ""

echo -e "${GREEN}✅ Application will run on:${NC}"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5001"
echo ""

echo -e "${YELLOW}🔑 Test Credentials:${NC}"
echo "User:      user@test.com / password"
echo "Volunteer: volunteer@test.com / password"
echo "Admin:     admin@test.com / CrowdFixAdmin@2026"
echo ""

echo -e "${BLUE}📚 Documentation:${NC}"
echo "- README.md - Overview"
echo "- SETUP_GUIDE.md - Complete setup"
echo "- PROJECT_COMPLETION.md - What's included"
echo "- backend/README.md - API docs"
echo "- frontend/README.md - Frontend info"
echo ""

echo -e "${GREEN}Happy Coding! 🎉${NC}"
