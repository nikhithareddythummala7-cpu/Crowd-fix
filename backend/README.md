# CrowdFix Backend
# Community Problem Reporting System

This is the backend for CrowdFix - a community problem reporting platform.

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for image storage
- Multer for file uploads

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file from .env.example:
```bash
cp .env.example .env
```

4. Update .env with your credentials:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5001
```

5. Start the server:
```bash
npm run dev    # Development (with nodemon)
npm start      # Production
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user (protected)
- PUT /api/auth/profile - Update user profile (protected)

### Complaints
- POST /api/complaints - Create complaint (protected)
- GET /api/complaints - Get user complaints (protected)
- GET /api/complaints/:id - Get single complaint (protected)
- PUT /api/complaints/:id - Update complaint (protected)
- DELETE /api/complaints/:id - Delete complaint (protected)

### Admin
- GET /api/admin/complaints - Get all complaints (admin only)
- PUT /api/admin/complaints/:id/status - Update complaint status (admin only)
- PUT /api/admin/complaints/:id/assign-volunteer - Assign volunteer (admin only)
- GET /api/admin/analytics - Get analytics (admin only)
- GET /api/admin/users - Get all users (admin only)
- PUT /api/admin/users/:id/role - Update user role (admin only)
- DELETE /api/admin/users/:id - Delete user (admin only)

### Volunteer
- GET /api/volunteer/nearby-complaints - Get nearby complaints (volunteer)
- GET /api/volunteer/assigned-complaints - Get assigned complaints (volunteer)
- POST /api/volunteer/activities - Create activity (volunteer)
- GET /api/volunteer/activities - Get activities (volunteer)
- PUT /api/volunteer/area - Update volunteer area (volunteer)

## Authentication
JWT tokens are required for protected routes. Include token in Authorization header:
```
Authorization: Bearer your_token_here
```
