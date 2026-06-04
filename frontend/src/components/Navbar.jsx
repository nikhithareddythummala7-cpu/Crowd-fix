import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
    navigate('/');
    handleMenuClose();
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin-dashboard';
    if (user?.role === 'volunteer') return '/volunteer-dashboard';
    return '/user-dashboard';
  };

  const handleDrawerNavigation = (path) => {
    navigate(path);
    handleDrawerClose();
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onKeyDown={handleDrawerClose}>
      <Box sx={{ p: 2, backgroundColor: '#1976d2', color: '#fff' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          🔧 CrowdFix
        </Typography>
        {isAuthenticated && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {user?.name}
          </Typography>
        )}
      </Box>
      <List>
        {isAuthenticated ? (
          <>
            <ListItemButton onClick={() => handleDrawerNavigation(getDashboardLink())}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => handleDrawerNavigation('/complaints')}>
              <ListItemText primary="History" />
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => handleDrawerNavigation('/profile')}>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton onClick={() => handleDrawerNavigation('/login')}>
              <ListItemText primary="Login" />
            </ListItemButton>
            <ListItemButton onClick={() => handleDrawerNavigation('/register')}>
              <ListItemText primary="Register" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1976d2', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          🔧 CrowdFix
        </Typography>

        {isMobile ? (
          <IconButton color="inherit" edge="end" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        ) : isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button color="inherit" component={Link} to={getDashboardLink()}>
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/complaints" sx={{ whiteSpace: 'nowrap' }}>
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
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
