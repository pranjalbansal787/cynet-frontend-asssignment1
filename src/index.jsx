import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import '@mui/material/styles';
import '@mui/material/theme';

const theme = createTheme();

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
