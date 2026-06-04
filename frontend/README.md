# CrowdFix Frontend

React.js frontend for CrowdFix - Community Problem Reporting System

## Tech Stack
- React.js v18
- React Router DOM v6
- Material-UI (MUI)
- Axios
- React Toastify

## Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file from .env.example:
```bash
cp .env.example .env
```

4. Update .env with API URL:
```
VITE_API_URL=http://localhost:5001/api
VITE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js
│   ├── ComplaintCard.js
│   ├── LoadingSpinner.js
│   └── NotFound.js
├── pages/              # Page components
│   ├── Home.js
│   ├── Register.js
│   ├── Login.js
│   ├── ReportComplaint.js
│   ├── ComplaintHistory.js
│   ├── UserDashboard.js
│   ├── VolunteerDashboard.js
│   ├── AdminDashboard.js
│   └── Profile.js
├── context/            # React Context (Auth)
│   └── AuthContext.js
├── services/           # API services
│   ├── api.js          # Axios instance
│   └── index.js        # API methods
├── routes/             # Route protection
│   └── ProtectedRoute.js
├── App.js             # Main app component
└── index.js           # Entry point
```

## Available Scripts

### `npm run dev`
Runs the app in development mode at [http://localhost:5173](http://localhost:5173)

### `npm run build`
Builds the app for production to the `dist` folder

### `npm run preview`
Previews the production build locally

## Features

- ✅ User authentication (Register/Login)
- ✅ Report civic issues with images
- ✅ Track complaint status
- ✅ Volunteer dashboard
- ✅ Admin analytics and management
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Protected routes with role-based access

## Pages

1. **Home** - Landing page with features and how it works
2. **Register** - User registration for user/volunteer role
3. **Login** - User login with demo credentials
4. **Report Complaint** - Create new complaint with image upload
5. **Complaint History** - View all complaints with filters
6. **User Dashboard** - User activity overview
7. **Volunteer Dashboard** - Nearby complaints and assigned issues
8. **Admin Dashboard** - Full control panel with analytics
9. **Profile** - User profile management

## API Integration

Axios is configured with:
- Base URL from environment variable
- JWT token in Authorization header
- Automatic error handling
- Token expiration handling

## Authentication

- JWT tokens stored in localStorage
- Auto logout on token expiration
- Role-based route protection
- Secure API calls with token

## Styling

- Material-UI components
- Custom color schemes
- Responsive grid layout
- Flexbox for layouts

## Deployment

### Vercel
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Set REACT_APP_API_URL
4. Deploy

### Netlify
1. Build: `npm run build`
2. Deploy build folder
3. Set environment variables
4. Configure redirects for routing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting
- Lazy loading
- Image optimization
- Minimal dependencies

## Future Improvements

- [ ] Dark mode
- [ ] PWA support
- [ ] Offline functionality
- [ ] Advanced filters
- [ ] Map integration
- [ ] Real-time notifications
