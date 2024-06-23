import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Styled container to center the login component on the screen
const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
}));

// Styled paper to create a card-like appearance for the login form
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
  backdropFilter: 'blur(10px)', // Blur effect for a frosted glass look
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Box shadow for depth
  width: '100%',
  maxWidth: '400px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4), // Responsive padding for smaller screens
  },
}));

// Styled avatar to hold the lock icon
const StyledAvatar = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: 'black', // Background color for the avatar
  width: theme.spacing(8),
  height: theme.spacing(8),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Light shadow for the avatar
}));

// Styled form to structure the form elements
const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

// Styled text field to customize the appearance of input fields
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: '0 0 0 2px rgba(255, 142, 83, 0.2)', // Shadow on hover
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px rgba(255, 142, 83, 0.4)', // Shadow when focused
    },
  },
}));

// Styled submit button with custom styles
const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  borderRadius: '10px',
  padding: '12px',
  fontSize: '1rem',
  fontWeight: 'bold',
  background: 'black',
  color: 'white',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)', // Box shadow for the button
  transition: 'all 0.3s',
  '&:hover': {
    background: 'black', // Button background on hover
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)', // Shadow on hover
    transform: 'translateY(-2px)', // Slight lift on hover
  },
}));

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState(''); // State for the username
  const [password, setPassword] = useState(''); // State for the password
  const navigate = useNavigate(); // Hook for navigation
  const theme = useTheme(); // Hook to access the theme

  // Handler for form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (username && password) {
      handleLogin(); // Calls the login handler if credentials are provided
      navigate('/dashboard'); // Navigates to the dashboard upon successful login
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={6}>
        <Typography component="h2" variant="h5" style={{ fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>
          Welcome to CyeNET
        </Typography>
        <StyledAvatar>
          <LockOutlinedIcon fontSize="large" style={{ color: 'white' }} />
        </StyledAvatar>
        <Typography component="h1" variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
          Login
        </Typography>
        <StyledForm onSubmit={onSubmit}>
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Updates the username state
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Updates the password state
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </SubmitButton>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;
