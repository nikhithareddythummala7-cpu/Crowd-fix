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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
} from '@mui/material';
import { adminService } from '../services';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priority: '',
    area: '',
  });
  const [editDialog, setEditDialog] = useState({ open: false, complaint: null });
  const [detailDialog, setDetailDialog] = useState({ open: false, complaint: null });
  const [assignDialog, setAssignDialog] = useState({ open: false, complaint: null });
  const [openImage, setOpenImage] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [volunteers, setVolunteers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userRoleFilter, setUserRoleFilter] = useState('');
  const [updateData, setUpdateData] = useState({
    status: '',
    priority: '',
    feedback: '',
  });

  useEffect(() => {
    fetchData();
  }, [filters, userRoleFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [complaintsRes, analyticsRes, usersRes, volunteersRes, activitiesRes] = await Promise.all([
        adminService.getAllComplaints(filters),
        adminService.getAnalytics(),
        adminService.getAllUsers(userRoleFilter),
        adminService.getAllUsers('volunteer'),
        adminService.getVolunteerActivities(),
      ]);
      console.log('Admin complaints loaded:', complaintsRes.data.complaints);
      setComplaints(complaintsRes.data.complaints);
      setAnalytics(analyticsRes.data.analytics);
      setUsers(usersRes.data.users);
      setVolunteers(volunteersRes.data.users);
      setActivities(activitiesRes.data.activities);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleUserRoleFilterChange = (e) => {
    setUserRoleFilter(e.target.value);
  };

  const handleOpenEditDialog = (complaint) => {
    setEditDialog({ open: true, complaint });
    setUpdateData({
      status: complaint.status,
      priority: complaint.priority,
      feedback: complaint.feedback || '',
    });
  };

  const handleOpenDetailDialog = (complaint) => {
    setDetailDialog({ open: true, complaint });
  };

  const handleCloseDetailDialog = () => {
    setDetailDialog({ open: false, complaint: null });
  };

  const handleOpenAssignDialog = (complaint) => {
    setAssignDialog({ open: true, complaint });
    setSelectedVolunteer(complaint.assignedVolunteer?._id || '');
  };

  const handleCloseAssignDialog = () => {
    setAssignDialog({ open: false, complaint: null });
    setSelectedVolunteer('');
  };

  const handleSelectVolunteer = (e) => {
    setSelectedVolunteer(e.target.value);
  };

  const handleAssignVolunteer = async () => {
    if (!selectedVolunteer) {
      toast.error('Please choose a volunteer');
      return;
    }

    try {
      await adminService.assignVolunteer(assignDialog.complaint._id, selectedVolunteer);
      toast.success('Volunteer assigned successfully!');
      fetchData();
      handleCloseAssignDialog();
    } catch (error) {
      toast.error('Failed to assign volunteer');
    }
  };

  const handleChangeUserRole = async (userId, role) => {
    try {
      await adminService.updateUserRole(userId, role);
      toast.success('User role updated successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialog({ open: false, complaint: null });
  };

  const handleUpdateComplaint = async () => {
    try {
      await adminService.updateComplaintStatus(editDialog.complaint._id, updateData);
      toast.success('Complaint updated successfully!');
      fetchData();
      handleCloseEditDialog();
    } catch (error) {
      toast.error('Failed to update complaint');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(userId);
        toast.success('User deleted successfully!');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          🔧 Admin Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage complaints, users, and analytics
        </Typography>
      </Box>

      {/* Tab Navigation */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Button
          variant={activeTab === 'overview' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </Button>
        <Button
          variant={activeTab === 'complaints' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('complaints')}
        >
          📝 Complaints
        </Button>
        <Button
          variant={activeTab === 'activities' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('activities')}
        >
          🚴 Volunteer Activities
        </Button>
        <Button
          variant={activeTab === 'users' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </Button>
      </Box>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon="📊"
                title="Total Complaints"
                value={analytics?.complaints.total}
                color="#1976d2"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon="⏳"
                title="Pending"
                value={analytics?.complaints.pending}
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon="🔄"
                title="In Progress"
                value={analytics?.complaints.inProgress}
                color="#2196f3"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon="✅"
                title="Resolved"
                value={analytics?.complaints.resolved}
                color="#4caf50"
              />
            </Grid>
          </Grid>

          {/* User Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {analytics?.users.total}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Users
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                    {analytics?.users.volunteers}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Active Volunteers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Category & Area Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    📊 Issues by Category
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {analytics?.categoryWise.map((item) => (
                      <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{item._id}</Typography>
                        <Chip label={item.count} color="primary" size="small" />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    📍 Issues by Area
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {analytics?.areaWise.slice(0, 5).map((item) => (
                      <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{item._id}</Typography>
                        <Chip label={item.count} color="primary" size="small" />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {/* Complaints Tab */}
      {activeTab === 'complaints' && (
        <>
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>User</strong></TableCell>
                  <TableCell><strong>Area</strong></TableCell>
                  <TableCell><strong>Volunteer</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Priority</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} sx={{ textAlign: 'center', py: 3 }}>
                      No complaints found
                    </TableCell>
                  </TableRow>
                ) : (
                  complaints.map((complaint) => (
                    <TableRow key={complaint._id}>
                      <TableCell>
                        {complaint.image ? (
                          <img
                            src={complaint.image}
                            alt="Complaint"
                            onClick={() => setOpenImage(complaint.image)}
                            style={{
                              width: "120px",
                              height: "90px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginTop: "5px",
                              cursor: "pointer"
                            }}
                          />
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No image
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{complaint.category}</TableCell>
                      <TableCell>{complaint.userId?.name}</TableCell>
                      <TableCell>{complaint.area}</TableCell>
                      <TableCell>{complaint.assignedVolunteer?.name || '-'}</TableCell>
                      <TableCell>
                        <Chip
                          label={complaint.status}
                          color={
                            complaint.status === 'Resolved'
                              ? 'success'
                              : complaint.status === 'In Progress'
                              ? 'info'
                              : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={complaint.priority}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleOpenDetailDialog(complaint)}
                        >
                          Details
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleOpenAssignDialog(complaint)}
                        >
                          Assign
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleOpenEditDialog(complaint)}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Volunteer Activities Tab */}
      {activeTab === 'activities' && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🚴 Volunteer Activities
          </Typography>
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Volunteer</strong></TableCell>
                  <TableCell><strong>Complaint</strong></TableCell>
                  <TableCell><strong>Area</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3 }}>
                      No volunteer activities found
                    </TableCell>
                  </TableRow>
                ) : (
                  activities.map((activity) => (
                    <TableRow key={activity._id}>
                      <TableCell>{activity.volunteerId?.name || '-'}</TableCell>
                      <TableCell>{activity.complaintId?.category || '-'}</TableCell>
                      <TableCell>{activity.complaintId?.area || '-'}</TableCell>
                      <TableCell>{activity.activityType}</TableCell>
                      <TableCell>{activity.description || '-'}</TableCell>
                      <TableCell>
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <FormControl size="small">
              <InputLabel>Role</InputLabel>
              <Select
                value={userRoleFilter}
                onChange={handleUserRoleFilterChange}
                label="Role"
              >
                <MenuItem value="">All Users</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="volunteer">Volunteer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Mobile</strong></TableCell>
                  <TableCell><strong>Area</strong></TableCell>
                  <TableCell><strong>Joined</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <FormControl fullWidth size="small">
                        <Select
                          value={user.role}
                          onChange={(e) => handleChangeUserRole(user._id, e.target.value)}
                        >
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="volunteer">Volunteer</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.area || '-'}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Complaint Detail Dialog */}
      <Dialog
        open={detailDialog.open}
        onClose={handleCloseDetailDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Complaint Details</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {detailDialog.complaint && (
            <Box sx={{ display: 'grid', gap: 2 }}>
              {detailDialog.complaint.image && (
                <Box sx={{ textAlign: 'center' }}>
                  <img
                    src={detailDialog.complaint.image}
                    alt="Complaint"
                    onClick={() => setOpenImage(detailDialog.complaint.image)}
                    style={{
                      maxWidth: '100%',
                      borderRadius: 8,
                      cursor: 'pointer'
                    }}
                  />
                </Box>
              )}
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Description
              </Typography>
              <Typography>{detailDialog.complaint.description}</Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2"><strong>Category:</strong> {detailDialog.complaint.category}</Typography>
                  <Typography variant="body2"><strong>Area:</strong> {detailDialog.complaint.area}</Typography>
                  <Typography variant="body2"><strong>Status:</strong> {detailDialog.complaint.status}</Typography>
                  <Typography variant="body2"><strong>Priority:</strong> {detailDialog.complaint.priority}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2"><strong>Reported by:</strong> {detailDialog.complaint.userId?.name || '-'}</Typography>
                  <Typography variant="body2"><strong>Email:</strong> {detailDialog.complaint.userId?.email || '-'}</Typography>
                  <Typography variant="body2"><strong>Mobile:</strong> {detailDialog.complaint.userId?.mobile || '-'}</Typography>
                  <Typography variant="body2"><strong>Assigned Volunteer:</strong> {detailDialog.complaint.assignedVolunteer?.name || 'Not assigned'}</Typography>
                </Grid>
              </Grid>

              {detailDialog.complaint.feedback && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
                    Admin Feedback
                  </Typography>
                  <Typography>{detailDialog.complaint.feedback}</Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog}>Close</Button>
        </DialogActions>
      </Dialog>

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

      {/* Assign Volunteer Dialog */}
      <Dialog
        open={assignDialog.open}
        onClose={handleCloseAssignDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Assign Volunteer</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Assign a volunteer based on the issue area and availability.
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Volunteer</InputLabel>
            <Select
              value={selectedVolunteer}
              onChange={handleSelectVolunteer}
              label="Volunteer"
            >
              <MenuItem value="">Select volunteer</MenuItem>
              {volunteers.map((volunteer) => (
                <MenuItem key={volunteer._id} value={volunteer._id}>
                  {volunteer.name} - {volunteer.area || 'No area'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog}>Cancel</Button>
          <Button onClick={handleAssignVolunteer} variant="contained">
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Complaint Dialog */}
      <Dialog
        open={editDialog.open}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Complaint</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={updateData.status}
              onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={updateData.priority}
              onChange={(e) => setUpdateData({ ...updateData, priority: e.target.value })}
              label="Priority"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Feedback"
            multiline
            rows={3}
            value={updateData.feedback}
            onChange={(e) => setUpdateData({ ...updateData, feedback: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdateComplaint} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
