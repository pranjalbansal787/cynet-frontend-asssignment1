import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Select,
  FormControl,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

// Styled AppBar component
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'white',
  color: 'black',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  marginBottom: '20px',
}));

// Styled title Typography component
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '1px',
  marginRight: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
}));

// Styled Button component
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 600,
  color: 'black',
  transition: 'all 0.3s',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

// Navbar component
const Navbar = ({ loggedIn, handleLogout }) => {
  const navigate = useNavigate(); // Hook from react-router-dom for navigation
  const location = useLocation(); // Hook from react-router-dom to get current location
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of menu
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer open/close

  // Function to check if a path is active
  const isActive = (path) => location.pathname === path;

  // Handle click on profile button
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element for menu
  };

  // Handle close of menu
  const handleMenuClose = () => {
    setAnchorEl(null); // Clear anchor element to close menu
  };

  // Toggle drawer open/close
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      {/* Main AppBar */}
      <StyledAppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Menu Icon for smaller screens */}
            <IconButton
              sx={{ ml: 1, display: { xs: 'flex', sm: 'none' } }}
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* Title of the application */}
            <Title variant="h6" component="div">
              CyeNET
            </Title>
          </Box>
          {/* Right-hand side navigation items */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
            }}
          >
            {/* Disabled select component */}
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
              <Select
                native
                inputProps={{
                  name: 'scanner',
                  id: 'outlined-age-native-simple',
                }}
                disabled
              >
                <option value={10}>Scanner</option>
              </Select>
            </FormControl>
            {/* Notification icon */}
            <IconButton color="inherit">
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            {/* Dashboard button */}
            <StyledButton
              color="inherit"
              onClick={() => navigate('/dashboard')}
              sx={{
                background: isActive('/dashboard') ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                '&:hover': {
                  background: isActive('/dashboard') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              Dashboard
            </StyledButton>
            {/* List button */}
            <StyledButton
              color="inherit"
              onClick={() => navigate('/list')}
              sx={{
                background: isActive('/list') ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                '&:hover': {
                  background: isActive('/list') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              List
            </StyledButton>
            {/* Conditional rendering based on login status */}
            {loggedIn ? (
              <>
                {/* Avatar button */}
                <IconButton onClick={handleProfileClick} color="inherit">
                  <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
                </IconButton>
                {/* Menu for profile options */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {/* Logout option */}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              // Login button
              <StyledButton color="inherit" onClick={() => navigate('/')}>
                Login
              </StyledButton>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Drawer for smaller screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <List>
          {/* Dashboard link */}
          <ListItem button onClick={() => { navigate('/dashboard'); setDrawerOpen(false); }}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {/* List link */}
          <ListItem button onClick={() => { navigate('/list'); setDrawerOpen(false); }}>
            <ListItemText primary="List" />
          </ListItem>
          {/* Conditional rendering based on login status */}
          {loggedIn ? (
            // Logout button
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            // Login button
            <ListItem button onClick={() => { navigate('/'); setDrawerOpen(false); }}>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
