# CrowdFix - Complete Setup Guide

## 🎯 Project Overview

CrowdFix is a production-ready MERN stack application for community problem reporting. Citizens can report civic issues, volunteers can assist in resolution, and admins can manage the entire system.

## 🏗️ Complete Project Structure

```
CrowdFix/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── cloudinary.js        # Image upload config
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── complaintController.js
│   │   ├── adminController.js
│   │   └── volunteerController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Complaint.js
│   │   └── VolunteerActivity.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── adminRoutes.js
│   │   └── volunteerRoutes.js
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── upload.js            # Multer config
│   │   └── errorHandler.js
│   ├── uploads/                 # Temp file storage
│   ├── server.js                # Express server
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── ComplaintCard.js
    │   │   ├── LoadingSpinner.js
    │   │   └── NotFound.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Register.js
    │   │   ├── Login.js
    │   │   ├── ReportComplaint.js
    │   │   ├── ComplaintHistory.js
    │   │   ├── UserDashboard.js
    │   │   ├── VolunteerDashboard.js
    │   │   ├── AdminDashboard.js
    │   │   └── Profile.js
    │   ├── context/
    │   │   └── AuthContext.js   # Auth state management
    │   ├── services/
    │   │   ├── api.js           # Axios config
    │   │   └── index.js         # API endpoints
    │   ├── routes/
    │   │   └── ProtectedRoute.js
    │   ├── App.js               # Main app
    │   └── index.js             # React DOM render
    ├── package.json
    ├── .env.example
    └── README.md
├── .gitignore
└── README.md
```

## 📋 Step-by-Step Setup Instructions

### Phase 1: Prerequisites

1. **Install Node.js**
   - Download from https://nodejs.org/
   - Choose LTS version
   - Verify installation: `node --version` and `npm --version`

2. **MongoDB Setup**
   Option A - Cloud (Recommended):
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create cluster
   - Get connection string
   
   Option B - Local:
   - Install MongoDB Community Edition
   - Start MongoDB service

3. **Cloudinary Setup**
   - Sign up at https://cloudinary.com/
   - Go to Dashboard
   - Copy Cloud Name, API Key, API Secret

### Phase 2: Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure .env**
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   JWT_SECRET=your_super_secret_key_change_in_production
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```
   
   Server runs on: `http://localhost:5001`

6. **Test backend**
   ```bash
   curl http://localhost:5001/api/health
   ```
   Should return: `{"success": true, "message": "Server is running"}`

### Phase 3: Frontend Setup

1. **Navigate to frontend** (open new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure .env**
   ```
   REACT_APP_API_URL=http://localhost:5001/api
   REACT_APP_ENV=development
   ```

5. **Start frontend**
   ```bash
   npm start
   ```
   
   App runs on: `http://localhost:3000`

## 🧪 Testing the Application

### 1. Test User Registration & Login

```bash
# Open browser to http://localhost:3000
# Click Register
# Fill form:
# Name: John Doe
# Email: john@test.com
# Password: password123
# Mobile: 9876543210
# Address: Main Street
# Role: User
# Register
```

### 2. Test User Features

- Report a complaint with image
- View complaint history
- Filter by category/status
- View profile
- Update profile

### 3. Test Volunteer Features

- Register as volunteer
- Set area
- View nearby complaints
- Log activities
- View assigned complaints

### 4. Test Admin Features

- Login with admin account
- View all complaints
- Update complaint status/priority
- View analytics
- Manage users

### 5. Sample Test Data

```json
User:
{
  "email": "user@test.com",
  "password": "password"
}

Volunteer:
{
  "email": "volunteer@test.com",
  "password": "password"
}

Admin:
{
  "email": "admin@test.com",
  "password": "CrowdFixAdmin@2026"
}
```

## 🔄 API Testing with Postman

### 1. Import API Collection
- Copy API endpoints from backend README
- Create collection in Postman
- Set variables for base URL and token

### 2. Test Endpoints

**Auth Routes:**
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
```

**Complaint Routes:**
```
POST   /api/complaints
GET    /api/complaints
GET    /api/complaints/:id
PUT    /api/complaints/:id
DELETE /api/complaints/:id
```

**Admin Routes:**
```
GET    /api/admin/complaints
PUT    /api/admin/complaints/:id/status
GET    /api/admin/analytics
GET    /api/admin/users
```

**Volunteer Routes:**
```
GET    /api/volunteer/nearby-complaints
GET    /api/volunteer/assigned-complaints
POST   /api/volunteer/activities
GET    /api/volunteer/activities
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Both servers will run concurrently on:
- Backend: http://localhost:5001
- Frontend: http://localhost:3000

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm install -g serve
serve -s build -l 3000
```

## 🐛 Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**
   - Check MONGO_URI in .env
   - Verify MongoDB is running
   - Check network access in MongoDB Atlas

2. **Port Already in Use**
   ```bash
   # Kill process on port 5001
   # Windows:
   netstat -ano | findstr :5001
   taskkill /PID <PID> /F
   
   # Mac/Linux:
   lsof -i :5001
   kill -9 <PID>
   ```

3. **Cloudinary Upload Error**
   - Verify credentials in .env
   - Check file size (max 5MB)
   - Ensure image format is supported

### Frontend Issues

1. **Blank Page**
   - Check browser console for errors
   - Verify REACT_APP_API_URL in .env
   - Clear browser cache: Ctrl+Shift+Delete

2. **API Connection Error**
   - Ensure backend is running
   - Check API URL in browser DevTools Network tab
   - Verify CORS settings in backend

3. **Authentication Issues**
   - Clear localStorage: `localStorage.clear()`
   - Check JWT token in Application tab
   - Verify token expiry

## 📦 Dependencies Overview

### Backend

```json
{
  "express": "^4.18.2",           // Web framework
  "mongoose": "^7.5.0",           // MongoDB ODM
  "bcryptjs": "^2.4.3",           // Password hashing
  "jsonwebtoken": "^9.1.0",       // JWT tokens
  "multer": "^1.4.5",             // File uploads
  "cloudinary": "^1.40.0",        // Image storage
  "cors": "^2.8.5",               // Cross-origin requests
  "dotenv": "^16.3.1",            // Environment variables
  "nodemon": "^3.0.1"             // Dev auto-reload
}
```

### Frontend

```json
{
  "react": "^18.2.0",             // UI library
  "react-dom": "^18.2.0",         // React DOM
  "react-router-dom": "^6.16.0",  // Routing
  "axios": "^1.5.0",              // HTTP client
  "@mui/material": "^5.14.0",     // UI components
  "@emotion/react": "^11.11.0",   // Styling
  "react-toastify": "^9.1.0"      // Notifications
}
```

## 🔐 Security Features Implemented

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Protected API routes with role verification
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling middleware
- ✅ Secure file upload with Multer
- ✅ Environment variable protection

## 📊 Database Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/volunteer/admin),
  mobile: String,
  address: String,
  area: String,
  profileImage: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaints Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  category: String,
  description: String,
  image: String (Cloudinary URL),
  location: {
    latitude: Number,
    longitude: Number
  },
  area: String,
  status: String (Pending/In Progress/Resolved),
  priority: String (Low/Medium/High),
  assignedVolunteer: ObjectId (ref: User),
  feedback: String,
  resolutionDate: Date,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### VolunteerActivity Collection
```javascript
{
  _id: ObjectId,
  volunteerId: ObjectId (ref: User),
  complaintId: ObjectId (ref: Complaint),
  activityType: String,
  description: String,
  status: String (Active/Inactive),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI/UX Features

- Modern Material-UI design
- Responsive mobile-first layout
- Dark-friendly color scheme
- Intuitive navigation
- Toast notifications for feedback
- Loading states and error boundaries
- Form validation
- Empty state messages

## 📈 Performance Optimization

- Lazy loading components
- Code splitting with React Router
- Optimized database queries
- Image optimization via Cloudinary
- Error boundary implementation
- Debounced search filters

## 🌐 Deployment

### Backend Deployment (Heroku/Railway)

1. **Prepare for deployment:**
   ```bash
   # Add production start script in package.json
   "start": "node server.js"
   ```

2. **Create Procfile:**
   ```
   web: npm start
   ```

3. **Set environment variables on platform**

4. **Deploy:** Push to GitHub, connect to hosting platform

### Frontend Deployment (Vercel/Netlify)

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy:** 
   - Connect GitHub to Vercel/Netlify
   - Set environment variables
   - Auto-deploy on push

## 💡 Tips & Best Practices

1. **Always use .env for sensitive data**
2. **Test all features before deployment**
3. **Keep dependencies updated**
4. **Use git version control**
5. **Write meaningful commit messages**
6. **Test on different devices**
7. **Monitor error logs**
8. **Regular database backups**

## 🎓 Learning Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Material-UI Docs](https://mui.com/)
- [JWT Guide](https://jwt.io/)
- [Cloudinary Docs](https://cloudinary.com/documentation)

## 📞 Support & Help

For issues:
1. Check error messages in console
2. Verify .env configuration
3. Check network requests in DevTools
4. Review backend logs
5. Test with Postman first

## ✨ Next Steps

1. ✅ Complete basic setup
2. ✅ Test all features
3. ✅ Deploy to production
4. ✅ Monitor user feedback
5. ✅ Add enhancements

---

**Congratulations! Your CrowdFix application is ready to deploy! 🎉**
