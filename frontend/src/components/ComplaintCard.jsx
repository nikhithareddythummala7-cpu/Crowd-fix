import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ComplaintCard = ({ complaint }) => {
  const navigate = useNavigate();
  const categoryColor = {
    'Potholes': '#ff6b6b',
    'Garbage': '#4ecdc4',
    'Water Leakage': '#45b7d1',
    'Drainage Issues': '#96ceb4',
    'Broken Streetlights': '#ffeaa7',
    'Road Damage': '#dfe6e9',
  };

  const statusColor = {
    'Pending': '#ffa500',
    'In Progress': '#3498db',
    'Resolved': '#2ecc71',
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {complaint.image && (
        <CardMedia
          component="img"
          height="200"
          image={complaint.image}
          alt={complaint.category}
          sx={{ width: '100%', objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={complaint.category}
            size="small"
            sx={{ backgroundColor: categoryColor[complaint.category] || '#bbb', color: '#fff' }}
          />
          <Chip
            label={complaint.status}
            size="small"
            sx={{ backgroundColor: statusColor[complaint.status] || '#bbb', color: '#fff' }}
          />
          <Chip
            label={complaint.priority}
            size="small"
            variant="outlined"
          />
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          📍 {complaint.area}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.5 }}>
          {complaint.description?.substring(0, 100)}...
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(complaint.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate(`/complaint/${complaint._id}`)}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default ComplaintCard;
