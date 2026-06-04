import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { complaintService } from '../services';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ReportComplaint = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    area: '',
    latitude: '',
    longitude: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          });
          toast.success('Location captured!');
        },
        () => toast.error('Unable to get location')
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.category || !formData.description || !formData.area) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append('category', formData.category);
      form.append('description', formData.description);
      form.append('area', formData.area);
      if (formData.latitude) form.append('latitude', formData.latitude);
      if (formData.longitude) form.append('longitude', formData.longitude);
      if (image) form.append('image', image);

      await complaintService.createComplaint(form);
      toast.success('Complaint reported successfully!');
      navigate('/complaints');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to report complaint';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          📋 Report a Problem
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Help us fix community issues by reporting problems in your area
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Form Fields */}
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category *</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="Potholes">🕳️ Potholes</MenuItem>
                <MenuItem value="Garbage">🗑️ Garbage</MenuItem>
                <MenuItem value="Water Leakage">💧 Water Leakage</MenuItem>
                <MenuItem value="Drainage Issues">🚰 Drainage Issues</MenuItem>
                <MenuItem value="Broken Streetlights">💡 Broken Streetlights</MenuItem>
                <MenuItem value="Road Damage">🛣️ Road Damage</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              placeholder="Describe the issue in detail..."
              required
            />

            <TextField
              fullWidth
              label="Area/Location Name"
              name="area"
              value={formData.area}
              onChange={handleChange}
              margin="normal"
              placeholder="e.g., Main Street, Downtown Market"
              required
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1, mt: 2 }}>
              <TextField
                label="Latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                disabled
                size="small"
              />
              <TextField
                label="Longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                disabled
                size="small"
              />
            </Box>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleGetLocation}
              sx={{ mt: 1, mb: 2 }}
            >
              📍 Get My Location
            </Button>
          </Box>

          {/* Image Upload */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Upload Photo (Optional)
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'block', marginBottom: 16 }}
            />
            {preview && (
              <Card>
                <CardMedia
                  component="img"
                  image={preview}
                  alt="preview"
                  sx={{ height: 300, objectFit: 'cover' }}
                />
              </Card>
            )}
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          disabled={loading}
          sx={{ mt: 4 }}
        >
          {loading ? <CircularProgress size={24} /> : '🚀 Submit Report'}
        </Button>
      </form>
    </Container>
  );
};

export default ReportComplaint;
