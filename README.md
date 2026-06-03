# CrowdFix - Community Problem Reporting System

A full-stack MERN application for citizens to report civic issues and connect with volunteers and administrators.

## 🌟 Features

### User Features
- 📝 Report community problems with images
- 📍 Auto or manual location marking
- 📊 Track complaint status and history
- 👤 Manage user profile
- 🔐 Secure authentication

### Volunteer Features
- 🏘️ View nearby complaints in assigned area
- ✅ Verify and assist in issue resolution
- 📋 Log volunteer activities
- 📍 Manage assigned area

### Admin Features
- 📊 Comprehensive analytics dashboard
- 🔍 Filter and manage all complaints
- 👥 User and volunteer management
- 📈 Area-wise and category-wise reports
- ⚙️ Priority and status management

## 🏗️ Project Structure

```
CrowdFix/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
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
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── errorHandler.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env.example
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
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   ├── api.js
    │   │   └── index.js
    │   ├── routes/
    │   │   └── ProtectedRoute.js
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)

### Installation

#### 1. Clone the repository
```bash
cd CrowdFix
```

#### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
npm install
npm run dev  # For development with nodemon
```

#### 3. Frontend Setup
```bash
cd ../frontend
cp .env.example .env
# Edit .env with API URL
npm install
npm start
```

### Environment Variables

#### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crowdfix
PORT=5001
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_ENV=development
```

## 📱 Pages & Routes

### Public Pages
- `/` - Home page
- `/login` - User login
- `/register` - User registration

### User Routes (Protected)
- `/user-dashboard` - User dashboard with stats
- `/report-complaint` - Create new complaint
- `/complaints` - Complaint history
- `/profile` - User profile

### Volunteer Routes (Protected)
- `/volunteer-dashboard` - Volunteer dashboard
- View nearby complaints
- Log volunteer activities

### Admin Routes (Protected)
- `/admin-dashboard` - Comprehensive admin panel
- View all complaints with filters
- User management
- Analytics & reports

## 🔐 Authentication

The application uses **JWT (JSON Web Tokens)** for secure authentication:
- Tokens stored in localStorage
- Auto token refresh on login
- Protected routes with role-based access control
- Password hashing with bcryptjs

### Demo Credentials
```
User:
Email: user@test.com
Password: password

Volunteer:
Email: volunteer@test.com
Password: password

Admin:
Email: admin@test.com
Password: CrowdFixAdmin@2026
```

## 📊 Database Models

### User Model
- name, email, password (hashed)
- mobile, address
- role (user/volunteer/admin)
- profileImage, isActive

### Complaint Model
- userId (reference)
- category (predefined list)
- description, image (Cloudinary URL)
- location (lat/long)
- area, status, priority
- assignedVolunteer (reference)
- feedback, resolutionDate

### VolunteerActivity Model
- volunteerId, complaintId (references)
- activityType, description
- status, createdAt

## 🎨 UI/UX Features

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Material-UI components
- ✅ Toast notifications
- ✅ Loading spinners
- ✅ Error handling
- ✅ Form validations
- ✅ Professional dashboard layouts
- ✅ Data filtering and sorting

## 📸 Image Upload

Uses **Cloudinary** for image storage:
- Automatic image optimization
- Secure image URLs in database
- Easy image management
- CDN delivery for fast loading

## 🌍 Complaint Categories

1. 🕳️ Potholes
2. 🗑️ Garbage
3. 💧 Water Leakage
4. 🚰 Drainage Issues
5. 💡 Broken Streetlights
6. 🛣️ Road Damage

## 📊 Complaint Status

1. ⏳ Pending - Newly reported
2. 🔄 In Progress - Being handled
3. ✅ Resolved - Issue fixed

## 🎯 Priority Levels

1. 🟢 Low
2. 🟡 Medium
3. 🔴 High

## 🔄 API Endpoints

See [backend/README.md](backend/README.md) for detailed API documentation.

### Key Endpoints:
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/complaints` - Create complaint
- `GET /api/complaints` - Get user complaints
- `GET /api/admin/complaints` - Get all complaints
- `GET /api/admin/analytics` - Get analytics
- `GET /api/volunteer/nearby-complaints` - Get nearby issues

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Create account on hosting platform
2. Connect GitHub repository
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the build folder
3. Configure API URL for production

## 📝 Tech Stack Summary

**Frontend:**
- React.js (v18)
- React Router v6
- Material-UI (MUI)
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary

**Database:**
- MongoDB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## 📄 License

ISC License - feel free to use for personal and commercial projects

## 👨‍💻 Author

Created for community development using MERN stack

## 🆘 Support

For issues and questions:
1. Check existing issues
2. Create a new issue with details
3. Include error messages and steps to reproduce

## ✅ Future Enhancements

- [ ] Map integration for location visualization
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Push notifications
- [ ] Advanced analytics with charts
- [ ] Mobile app (React Native)
- [ ] Real-time updates (WebSocket)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Video upload support
- [ ] Comments/feedback system
- [ ] Rating system for volunteers

---

**Happy Coding! 🚀**

For any questions or improvements, feel free to reach out!
