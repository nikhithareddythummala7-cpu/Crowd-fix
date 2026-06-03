import React from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin-dashboard';
    if (user?.role === 'volunteer') return '/volunteer-dashboard';
    return '/user-dashboard';
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          🔧 CrowdFix
        </Typography>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button color="inherit" component={Link} to={getDashboardLink()}>
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/complaints">
              History
            </Button>
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={handleMenuOpen}
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: '#ff9800' }}>
                {user?.name?.[0]?.toUpperCase()}
              </Avatar>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>
                <Typography variant="body2">{user?.name}</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              variant="outlined"
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              variant="contained"
              sx={{ backgroundColor: '#fff', color: '#1976d2' }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
