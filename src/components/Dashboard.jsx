import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';

// Define a keyframe animation for fading in and translating Y
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Dashboard component function
const Dashboard = () => {
  return (
    // Container component from Material-UI with custom styling
    <Container
      maxWidth="lg" // Set maximum width to large
      sx={{
        padding: '2rem', // Padding around the container
      }}
    >
      {/* Box component for the main content */}
      <Box
        sx={{
          display: 'flex', // Flex display
          flexDirection: 'column', // Column direction for children
          alignItems: 'center', // Center align items horizontally
          justifyContent: 'center', // Center align items vertically
          minHeight: '100vh', // Minimum height of viewport height
          textAlign: 'center', // Center align text
          backgroundColor: '#f0f0f0', // Background color
          animation: `${fadeIn} 1.5s ease-in-out`, // Apply fadeIn animation
          borderRadius: '8px', // Rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow
        }}
      >
        {/* Main title */}
        <Typography
          variant="h4" // Heading variant
          sx={{
            marginBottom: '1rem', // Bottom margin
            fontWeight: 'bold', // Bold font weight
            color: '#3f51b5', // Text color
            animation: `${fadeIn} 2s ease-in-out`, // Apply fadeIn animation
          }}
        >
          Welcome to the CyeNET dashboard!
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6" // Subheading variant
          sx={{
            color: '#555', // Text color
            animation: `${fadeIn} 2.5s ease-in-out`, // Apply fadeIn animation
          }}
        >
          Currently, there's no data available. To view the list of scans, please click on the List Tab in the navigation bar.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
