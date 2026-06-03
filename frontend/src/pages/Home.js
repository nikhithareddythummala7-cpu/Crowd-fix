import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: '📸',
      title: 'Report Issues',
      description: 'Upload photos and details of community problems',
    },
    {
      icon: '📍',
      title: 'Location Tracking',
      description: 'Automatic or manual location marking',
    },
    {
      icon: '👥',
      title: 'Volunteer Support',
      description: 'Help from local volunteers to resolve issues',
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor complaint status and updates',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #115293 100%)',
          color: '#fff',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            🔧 CrowdFix
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Community Problem Reporting System
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: 18 }}>
            Report civic issues, track progress, and engage with your community to build a better tomorrow.
          </Typography>
          {!isAuthenticated ? (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: '#fff', color: '#1976d2' }}
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ color: '#fff', borderColor: '#fff' }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: '#fff', color: '#1976d2' }}
                onClick={() =>
                  user?.role === 'admin'
                    ? navigate('/admin-dashboard')
                    : user?.role === 'volunteer'
                    ? navigate('/volunteer-dashboard')
                    : navigate('/report-complaint')
                }
              >
                {user?.role === 'admin'
                  ? 'Go to Admin Dashboard'
                  : user?.role === 'volunteer'
                  ? 'Go to Volunteer Dashboard'
                  : 'Report an Issue'}
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
          Why CrowdFix?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How it works */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ mb: 2 }}>1️⃣</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Report
              </Typography>
              <Typography variant="body2">
                Take a photo and describe the issue you found
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ mb: 2 }}>2️⃣</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Share Location
              </Typography>
              <Typography variant="body2">
                Add location manually or use GPS
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ mb: 2 }}>3️⃣</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Get Volunteers
              </Typography>
              <Typography variant="body2">
                Volunteers verify and assist in resolution
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ mb: 2 }}>4️⃣</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Track Progress
              </Typography>
              <Typography variant="body2">
                Monitor status until issue is resolved
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} sx={{ textAlign: 'center' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              1000+
            </Typography>
            <Typography variant="body1">Issues Reported</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2ecc71' }}>
              750+
            </Typography>
            <Typography variant="body1">Resolved</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#f39c12' }}>
              500+
            </Typography>
            <Typography variant="body1">Active Volunteers</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#e74c3c' }}>
              50+
            </Typography>
            <Typography variant="body1">Cities</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
