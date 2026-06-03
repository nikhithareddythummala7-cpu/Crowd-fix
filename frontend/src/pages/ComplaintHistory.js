import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { complaintService } from '../services';
import ComplaintCard from '../components/ComplaintCard';
import { toast } from 'react-toastify';

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    searchArea: '',
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintService.getUserComplaints();
      setComplaints(response.data.complaints);
      setFilteredComplaints(response.data.complaints);
    } catch (error) {
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = complaints;

    if (filters.category) {
      filtered = filtered.filter((c) => c.category === filters.category);
    }
    if (filters.status) {
      filtered = filtered.filter((c) => c.status === filters.status);
    }
    if (filters.searchArea) {
      filtered = filtered.filter((c) =>
        c.area.toLowerCase().includes(filters.searchArea.toLowerCase())
      );
    }

    setFilteredComplaints(filtered);
  }, [filters, complaints]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          📝 Your Complaint History
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Track and manage all your reported issues
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 4 }}>
        <TextField
          label="Search Area"
          name="searchArea"
          value={filters.searchArea}
          onChange={handleFilterChange}
          size="small"
        />
        <FormControl size="small">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            label="Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Potholes">Potholes</MenuItem>
            <MenuItem value="Garbage">Garbage</MenuItem>
            <MenuItem value="Water Leakage">Water Leakage</MenuItem>
            <MenuItem value="Drainage Issues">Drainage Issues</MenuItem>
            <MenuItem value="Broken Streetlights">Broken Streetlights</MenuItem>
            <MenuItem value="Road Damage">Road Damage</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            label="Status"
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => setFilters({ category: '', status: '', searchArea: '' })}
        >
          Reset Filters
        </Button>
      </Box>

      {filteredComplaints.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="textSecondary">
            No complaints found
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Total: {filteredComplaints.length} complaint(s)
          </Typography>
          <Grid container spacing={3}>
            {filteredComplaints.map((complaint) => (
              <Grid item xs={12} sm={6} md={4} key={complaint._id}>
                <ComplaintCard complaint={complaint} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ComplaintHistory;
