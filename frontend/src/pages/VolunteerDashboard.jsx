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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { volunteerService, complaintService } from '../services';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const VolunteerDashboard = () => {
  const [nearbyComplaints, setNearbyComplaints] = useState([]);
  const [assignedComplaints, setAssignedComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState('');
  const [openActivityDialog, setOpenActivityDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [openImage, setOpenImage] = useState(null);
  const [activityData, setActivityData] = useState({
    activityType: 'In Investigation',
    description: '',
  });
  const { user } = useAuth();

  useEffect(() => {
    setArea(user?.area || '');
    fetchComplaints();
  }, [user?.area]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const [nearby, assigned] = await Promise.all([
        volunteerService.getNearbyComplaints(user?.area),
        volunteerService.getAssignedComplaints(),
      ]);
      console.log('Volunteer nearby complaints:', nearby.data.complaints);
      console.log('Volunteer assigned complaints:', assigned.data.complaints);
      setNearbyComplaints(nearby.data.complaints);
      setAssignedComplaints(assigned.data.complaints);
    } catch (error) {
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateArea = async () => {
    try {
      await volunteerService.updateArea(area);
      toast.success('Area updated successfully!');
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update area');
    }
  };

  const handleOpenActivityDialog = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenActivityDialog(true);
  };

  const handleCloseActivityDialog = () => {
    setOpenActivityDialog(false);
    setActivityData({ activityType: 'In Investigation', description: '' });
  };

  const handleCreateActivity = async () => {
    try {
      await volunteerService.createActivity({
        complaintId: selectedComplaint._id,
        activityType: activityData.activityType,
        description: activityData.description,
      });
      toast.success('Activity logged successfully!');
      handleCloseActivityDialog();
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to create activity');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const ComplaintItem = ({ complaint, isAssigned = false }) => (
    <Card sx={{ mb: 2, p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'start', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {complaint.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            📍 {complaint.area} | 📝 {complaint.userId?.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {complaint.description}
          </Typography>
          {complaint.image && (
            <Box sx={{ mt: 1, mb: 1 }}>
              <img
                src={complaint.image}
                alt="Complaint"
                onClick={() => setOpenImage(complaint.image)}
                style={{
                  width: "120px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              />
            </Box>
          )}
          <Typography variant="caption" color="textSecondary">
            {new Date(complaint.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Box sx={{ textAlign: { xs: 'left', md: 'right' }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
          <Typography
            variant="caption"
            sx={{
              display: 'inline-block',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              backgroundColor: complaint.status === 'Resolved' ? '#4caf50' : '#ff9800',
              color: '#fff',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            {complaint.status}
          </Typography>
          {isAssigned && (
            <Button
              size="small"
              variant="contained"
              onClick={() => handleOpenActivityDialog(complaint)}
              sx={{ display: 'block', mt: 1 }}
            >
              Log Activity
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          🙋 Welcome, {user?.name}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Help resolve community issues in your area
        </Typography>
      </Box>

      {/* Area Settings */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          📍 Your Area
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <TextField
            label="Area Name"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleUpdateArea}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Update Area
          </Button>
        </Box>
      </Card>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {nearbyComplaints.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Nearby Issues
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                {assignedComplaints.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Assigned to You
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Assigned Complaints */}
      {assignedComplaints.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            ✅ Assigned to You
          </Typography>
          {assignedComplaints.map((complaint) => (
            <ComplaintItem key={complaint._id} complaint={complaint} isAssigned={true} />
          ))}
        </Box>
      )}

      {/* Nearby Complaints */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          🏘️ Nearby Issues
        </Typography>
        {nearbyComplaints.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="textSecondary">
                No nearby issues in your area
              </Typography>
            </CardContent>
          </Card>
        ) : (
          nearbyComplaints.slice(0, 10).map((complaint) => (
            <ComplaintItem key={complaint._id} complaint={complaint} />
          ))
        )}
      </Box>

      <Dialog
        open={Boolean(openImage)}
        onClose={() => setOpenImage(null)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ backgroundColor: 'rgba(0, 0, 0, 0.92)', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img
              src={openImage || ''}
              alt="Full Preview"
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                borderRadius: '12px'
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.92)' }}>
          <Button onClick={() => setOpenImage(null)} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Activity Dialog */}
      <Dialog open={openActivityDialog} onClose={handleCloseActivityDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Log Volunteer Activity</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Activity Type</InputLabel>
            <Select
              value={activityData.activityType}
              onChange={(e) => setActivityData({ ...activityData, activityType: e.target.value })}
              label="Activity Type"
            >
              <MenuItem value="In Investigation">In Investigation</MenuItem>
              <MenuItem value="Verified">Verified</MenuItem>
              <MenuItem value="Escalated">Escalated</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={activityData.description}
            onChange={(e) => setActivityData({ ...activityData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActivityDialog}>Cancel</Button>
          <Button onClick={handleCreateActivity} variant="contained">
            Log Activity
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default VolunteerDashboard;
