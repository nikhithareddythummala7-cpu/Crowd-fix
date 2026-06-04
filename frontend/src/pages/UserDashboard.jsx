import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
} from '@mui/material';
import { complaintService } from '../services';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintService.getUserComplaints();
      const data = response.data.complaints;
      setComplaints(data);

      // Calculate stats
      setStats({
        total: data.length,
        pending: data.filter((c) => c.status === 'Pending').length,
        inProgress: data.filter((c) => c.status === 'In Progress').length,
        resolved: data.filter((c) => c.status === 'Resolved').length,
      });
    } catch (error) {
      console.log('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, title, value, color }) => (
    <Card sx={{ background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)` }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {icon}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          👋 Welcome, {user?.name}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Here's your complaint activity overview
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon="📊" title="Total Reports" value={stats.total} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon="⏳" title="Pending" value={stats.pending} color="#ff9800" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon="🔄" title="In Progress" value={stats.inProgress} color="#2196f3" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon="✅" title="Resolved" value={stats.resolved} color="#4caf50" />
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/report-complaint')}
        >
          📝 Report New Issue
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/complaints')}
        >
          👀 View All Reports
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/profile')}
        >
          👤 My Profile
        </Button>
      </Box>

      {/* Recent Complaints */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Recent Reports
        </Typography>
        {complaints.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="textSecondary">
                You haven't reported any issues yet.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate('/report-complaint')}
              >
                Report First Issue
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {complaints.slice(0, 6).map((complaint) => (
              <Grid item xs={12} md={6} key={complaint._id}>
                <Card sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'start' }, gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {complaint.category}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        📍 {complaint.area}
                      </Typography>
                      <Typography variant="body2">
                        {complaint.description.substring(0, 60)}...
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          backgroundColor: complaint.status === 'Resolved' ? '#4caf50' : complaint.status === 'In Progress' ? '#2196f3' : '#ff9800',
                          color: '#fff',
                          fontWeight: 'bold',
                        }}
                      >
                        {complaint.status}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default UserDashboard;
