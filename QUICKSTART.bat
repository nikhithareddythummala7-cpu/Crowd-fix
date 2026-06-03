@echo off
REM CrowdFix - Quick Start Script for Windows

echo.
echo =========================================================
echo   CrowdFix - Community Problem Reporting System
echo =========================================================
echo.

echo 📋 Setup Checklist:
echo 1. Create MongoDB cluster at mongodb.com/cloud/atlas
echo 2. Get Cloudinary credentials from cloudinary.com
echo 3. Copy MongoDB URI and Cloudinary keys
echo.

echo 🔧 Backend Setup:
echo cd backend
echo cp .env.example .env
echo REM Edit .env with your credentials
echo npm install
echo npm run dev
echo.

echo 💻 Frontend Setup (new terminal):
echo cd frontend
echo cp .env.example .env
echo npm install
echo npm start
echo.

echo ✅ Application will run on:
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5001
echo.

echo 🔑 Test Credentials:
echo User:      user@test.com / password
echo Volunteer: volunteer@test.com / password
echo Admin:     admin@test.com / CrowdFixAdmin@2026
echo.

echo 📚 Documentation:
echo - README.md - Overview
echo - SETUP_GUIDE.md - Complete setup
echo - PROJECT_COMPLETION.md - What's included
echo - backend/README.md - API docs
echo - frontend/README.md - Frontend info
echo.

echo Happy Coding! 🎉
echo.

pause
