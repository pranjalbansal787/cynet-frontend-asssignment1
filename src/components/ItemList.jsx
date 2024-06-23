import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setSelectedItem } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Typography, Fade, Button, Grid, Tabs, Tab, IconButton, InputAdornment, MenuItem, Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

// Custom styled component for TableCell to add specific styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
  whiteSpace: 'nowrap', 
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

// Custom styled component for TableRow to add hover effects and alternating row colors
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
  },
  transition: 'background-color 0.3s ease',
}));

// Custom styled component for a small colored box indicating severity
const SeverityBox = styled(Box)(({ color }) => ({
  width: '50px',
  height: '20px',
  backgroundColor: color,
  borderRadius: '4px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

// Custom styled component for Tabs to customize layout and styles
const StyledTabs = styled(Tabs)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  },
}));

// Custom styled component for Tab to add specific styles for selected and unselected states
const StyledTab = styled(Tab)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  transition: 'background-color 0.3s ease',
  textTransform: 'capitalize',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  '&:not(.Mui-selected)': {
    color: theme.palette.text.primary,
  },
}));

const ItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(state => state.items.items); // Access items from Redux state
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items based on search and tab value
  const [tabValue, setTabValue] = useState(0); // State for currently selected tab
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element for options menu
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to check if screen is small for responsive design

  // Fetch items and dispatch to Redux store when component mounts
  useEffect(() => {
    const fetchedItems = [
      { item_id: 1, scanName: 'Web Application Scan', targetUrl: 'http://example1.com', scanEngine: 'Nessus', status: 'Completed', riskScore: 'B', totalVulnerabilities: 213, severity: 'Critical' },
      { item_id: 2, scanName: 'Network Infrastructure Scan', targetUrl: 'http://example2.com', scanEngine: 'OpenVAS', status: 'Completed', riskScore: 'A', totalVulnerabilities: 156, severity: 'High' },
      { item_id: 3, scanName: 'Cloud Security Audit', targetUrl: 'http://example3.com', scanEngine: 'Qualys', status: 'In Progress', riskScore: 'C', totalVulnerabilities: 89, severity: 'Medium' },
      { item_id: 4, scanName: 'Mobile App Security Scan', targetUrl: 'http://example4.com', scanEngine: 'AppScan', status: 'Scheduled', riskScore: 'B', totalVulnerabilities: 0, severity: 'Low' },
      { item_id: 5, scanName: 'IoT Device Security Check', targetUrl: 'http://example5.com', scanEngine: 'Nessus', status: 'Completed', riskScore: 'B', totalVulnerabilities: 178, severity: 'Critical' },
      { item_id: 6, scanName: 'Database Security Scan', targetUrl: 'http://example6.com', scanEngine: 'McAfee', status: 'In Progress', riskScore: 'A', totalVulnerabilities: 102, severity: 'High' },
      { item_id: 7, scanName: 'API Security Test', targetUrl: 'http://example7.com', scanEngine: 'Acunetix', status: 'Completed', riskScore: 'C', totalVulnerabilities: 45, severity: 'Low' },
      { item_id: 8, scanName: 'Compatibilty Test', targetUrl: 'http://example8.com', scanEngine: 'Acunetix', status: 'Scheduled', riskScore: 'C', totalVulnerabilities: 45, severity: 'Low' },
    ];
    dispatch(setItems(fetchedItems)); // Dispatch fetched items to Redux store
  }, [dispatch]);

  // Filter items based on search term and tab value
  useEffect(() => {
    let filtered = items.filter(item => item.scanName.toLowerCase().includes(searchTerm.toLowerCase()));

    if (tabValue === 1) {
      filtered = filtered.filter(item => item.status === 'Scheduled');
    } else if (tabValue === 2) {
      filtered = filtered.filter(item => item.status === 'Completed');
    }

    setFilteredItems(filtered); // Update filtered items state
  }, [searchTerm, items, tabValue]);

  // Handle screen resize to switch between tabs and select dropdown
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle row click to navigate to item details page
  const handleClick = (item) => {
    dispatch(setSelectedItem(item));
    sessionStorage.setItem('selectedItem', JSON.stringify(item));
    navigate('/list/details');
  };

  // Handle options button click to show menu
  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Get color based on severity
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'red';
      case 'High': return 'orange';
      case 'Medium': return 'yellow';
      case 'Low': return 'green';
      default: return 'grey';
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle select dropdown change
  const handleSelectChange = (event) => {
    setTabValue(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          <TextField
            label="Search Scan Name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
          >
            Add New Profile
          </Button>
        </Grid>
      </Grid>
      {isSmallScreen ? (
        <Select
          value={tabValue}
          onChange={handleSelectChange}
          fullWidth
          variant="outlined"
          sx={{ my: 2 }}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Scheduled Scans</MenuItem>
          <MenuItem value={2}>Completed Scans</MenuItem>
        </Select>
      ) : (
        <StyledTabs value={tabValue} onChange={handleTabChange} sx={{ my: 2 }}>
          <StyledTab label="All" />
          <StyledTab label="Scheduled Scans" />
          <StyledTab label="Completed Scans" />
        </StyledTabs>
      )}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Scan Name</StyledTableCell>
              <StyledTableCell>Target URL</StyledTableCell>
              <StyledTableCell>Scan Engine</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Risk Score</StyledTableCell>
              <StyledTableCell>Total Vulnerabilities</StyledTableCell>
              <StyledTableCell>Severity</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item, index) => (
              <Fade in={true} timeout={300 + index * 100} key={item.item_id}>
                <StyledTableRow hover onClick={() => handleClick(item)}>
                  <TableCell>
                    <Typography variant="body1" color="primary" sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      {item.scanName}
                      <KeyboardArrowDownIcon sx={{ color: 'inherit', marginRight: '8px' }} />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <a href={item.targetUrl} style={{ color: 'blue', textDecoration: 'underline', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }} target="_blank" rel="noopener noreferrer">
                      {item.targetUrl}
                    </a>
                  </TableCell>
                  <TableCell>{item.scanEngine}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="800">
                      {item.riskScore}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.totalVulnerabilities}</TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <SeverityBox color={getSeverityColor(item.severity)} />
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="more options" onClick={handleOptionsClick}>
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              </Fade>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ItemList;
