import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container, Typography, Grid, Paper, List, ListItem, Button,
  Tabs, Tab, Box, AppBar, Toolbar, CircularProgress, useMediaQuery, MenuItem, Select
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import GaugeChart from 'react-gauge-chart';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { styled, useTheme } from '@mui/material/styles';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define severity colors for various vulnerability levels
const severityColors = {
  critical: '#FF0000',
  high: '#FFA500',
  medium: '#FFFF00',
  low: '#008000',
};

// Style customization for Tabs
const StyledTab = styled(Tab)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  transition: 'background-color 0.3s ease',
  textTransform: 'capitalize',
  // fontFamily:'monospace',
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

// TabPanel component to handle tab content display
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Main ItemDetails component
const ItemDetails = () => {
  // State declarations
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [riskScore, setRiskScore] = useState(5.2);
  const [vulnerabilityTabValue, setVulnerabilityTabValue] = useState(0);
  const [mainTabValue, setMainTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTabLabel, setSelectedTabLabel] = useState('Home'); // Default to 'Home' tab

  // Get the selected item from Redux store or session storage
  const reduxSelectedItem = useSelector((state) => state.items.selectedItem);
  const sessionSelectedItem = JSON.parse(sessionStorage.getItem('selectedItem'));

  // Theme and responsive design breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Effect hook to handle item selection and data fetching
  useEffect(() => {
    const newItem = reduxSelectedItem || sessionSelectedItem;

    if (JSON.stringify(newItem) !== JSON.stringify(selectedItem)) {
      setSelectedItem(newItem);

      if (!sessionSelectedItem) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          fetchData(newItem);
        }, 1000);
      } else {
        fetchData(newItem);
      }
    }
  }, [reduxSelectedItem, sessionSelectedItem, selectedItem]);

  // Function to calculate the risk score based on the item data
  const fetchData = (item) => {
    if (item) {
      const { critical = 0, high = 0, medium = 0, low = 0 } = item.vulnerabilityBreakdown || {};
      const totalVulnerabilities = critical + high + medium + low;

      if (totalVulnerabilities === 0) {
        setRiskScore(8.4);
      } else {
        const score = ((critical * 4) + (high * 3) + (medium * 2) + (low * 1)) / totalVulnerabilities;
        setRiskScore(score.toFixed(1));
      }
    }
  };

  // Static data for the component
  const vulnerabilityBreakdown = {
    critical: 6,
    high: 78,
    medium: 99,
    low: 30,
  };

  const topVulnerabilities = [
    { severity: 'medium', description: 'X-Content-Type-Options Header Missing', count: 271 },
    { severity: 'high', description: 'Content Security Policy (CSP) Header Not Set', count: 54 },
    { severity: 'high', description: 'Missing Anti-clickjacking Header', count: 38 },
    { severity: 'low', description: 'Information Disclosure - Suspicious Comments', count: 8 },
    { severity: 'low', description: 'User Agent Fuzzer', count: 4 },
  ];

  const mostCommonCVEs = [
    { id: 'CVE-2021-44228', description: 'Log4j Remote Code Execution', severity: 'critical' },
    { id: 'CVE-2021-27101', description: 'SQL Injection Vulnerability', severity: 'high' },
    { id: 'CVE-2021-21972', description: 'VMware vCenter Server RCE', severity: 'critical' },
    { id: 'CVE-2021-26855', description: 'Microsoft Exchange Server RCE', severity: 'critical' },
    { id: 'CVE-2021-34527', description: 'Windows Print Spooler RCE', severity: 'high' },
  ];

  // Data and options for the bar chart
  const barData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Vulnerabilities',
        data: [vulnerabilityBreakdown.critical, vulnerabilityBreakdown.high, vulnerabilityBreakdown.medium, vulnerabilityBreakdown.low],
        backgroundColor: [severityColors.critical, severityColors.high, severityColors.medium, severityColors.low],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Handle vulnerability tab change
  const handleVulnerabilityTabChange = (event, newValue) => {
    setVulnerabilityTabValue(newValue);
  };

  // Handle main tab change
  const handleMainTabChange = (event, newValue) => {
    setMainTabValue(newValue);
    setSelectedTabLabel(['Home', 'Scanner Result', 'Report'][newValue]);
  };

  // Handle menu click for mobile view
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle menu item click
  const handleMenuItemClick = (index) => {
    setMainTabValue(index);
    setSelectedTabLabel(['Home', 'Scanner Result', 'Report'][index]);
    handleMenuClose();
  };

  // Handle vulnerability dropdown change for mobile view
  const handleVulnerabilityDropdownChange = (event) => {
    setVulnerabilityTabValue(event.target.value);
  };

  // Render the scanner result section
  const renderScannerResult = () => {
    let riskSeverity = 'low';

    if (riskScore >= 5 && riskScore < 6) {
      riskSeverity = 'medium';
    } else if (riskScore >= 6 && riskScore < 7) {
      riskSeverity = 'high';
    } else if (riskScore >= 7) {
      riskSeverity = 'critical';
    }

    const riskScoreBackgroundColor = severityColors[riskSeverity];

    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </div>
      );
    }

    if (!selectedItem) {
      return <Typography variant="subtitle1">No item selected</Typography>;
    }

    return (
      <Container maxWidth="lg" style={{ backgroundColor: 'white', padding: '20px' }}>
        <Grid container spacing={3}>
          {/* Vulnerability Summary */}
          <Grid item xs={12} container spacing={2}>
            {[
              { label: 'Total Vulnerabilities', count: 213, color: '#7E57C2' },
              { label: 'Critical', count: vulnerabilityBreakdown.critical, color: severityColors.critical },
              { label: 'High', count: vulnerabilityBreakdown.high, color: severityColors.high },
              { label: 'Medium', count: vulnerabilityBreakdown.medium, color: severityColors.medium },
              { label: 'Low', count: vulnerabilityBreakdown.low, color: severityColors.low },
            ].map(({ label, count, color }) => (
              <Grid item xs={6} sm={4} md={2.4} key={label}>
                <Paper elevation={3} style={{ textAlign: 'center' }}>
                  <Box style={{ padding: '10px', backgroundColor: color }}>
                    <Typography variant={isMobile ? 'h6' : 'h4'} style={{ color: label === 'Medium' ? 'black' : 'white', fontWeight: 'bold' }}>
                      {count}
                    </Typography>
                  </Box>
                  <Box style={{ padding: '5px', backgroundColor: 'white' }}>
                    <Typography variant={isMobile ? 'body2' : 'subtitle2'} style={{ color: 'black' }}>
                      {label}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Risk Score (Gauge Chart) */}
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <Box display="flex" flexDirection="column" alignItems="center" width="100%" marginBottom="20px">
                <Paper elevation={3} style={{ padding: '5px 15px', backgroundColor: riskScoreBackgroundColor }}>
                  <Typography variant={isMobile ? 'h5' : 'h4'} style={{ fontWeight: 'bold', color: riskSeverity === 'medium' ? 'black' : 'white' }}>
                    {riskScore}
                  </Typography>
                </Paper>
                <Typography variant="subtitle1" fontWeight="bold">
                  Risk Score
                </Typography>
              </Box>
              <GaugeChart
                id="gauge-chart"
                nrOfLevels={4}
                colors={["#008000", "#FFFF00", "#FFA500", "#FF0000"]}
                arcWidth={0.3}
                percent={riskScore / 10}
                hideText
                textColor="#000000"
              />
            </Paper>
          </Grid>

          {/* Top Vulnerabilities and Most Common CVEs */}
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px' }}>
              {isMobile ? (
                <Select
                  value={vulnerabilityTabValue}
                  onChange={handleVulnerabilityDropdownChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value={0}>Top Vulnerabilities</MenuItem>
                  <MenuItem value={1}>Most Common CVE</MenuItem>
                </Select>
              ) : (
                <Tabs value={vulnerabilityTabValue} onChange={handleVulnerabilityTabChange} aria-label="vulnerability tabs">
                  <StyledTab label="Top Vulnerabilities" />
                  <StyledTab label="Most Common CVE" />
                </Tabs>
              )}
              <TabPanel value={vulnerabilityTabValue} index={0}>
                <List style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {topVulnerabilities.map((vuln, index) => (
                    <ListItem key={index} style={{ padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '5px' }}>{vuln.description}</Typography>
                      <Box display="flex" width="100%" justifyContent="space-between">
                        <Box
                          component="span"
                          sx={{
                            backgroundColor: severityColors[vuln.severity],
                            color: vuln.severity === 'medium' ? 'black' : 'white',
                            padding: '4px 4px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            fontFamily:'sans-serif',
                            textTransform: 'uppercase',
                            minWidth: '70px',
                            textAlign: 'center'
                          }}
                        >
                          {vuln.severity}
                        </Box>
                        <Box
                          style={{
                            backgroundColor: '#E0E0E0',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            minWidth: '40px',
                            textAlign: 'center'
                          }}
                        >
                          <Typography variant="body2">{vuln.count}</Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
              <TabPanel value={vulnerabilityTabValue} index={1}>
                <List>
                  {mostCommonCVEs.map((cve, index) => (
                    <ListItem key={index} style={{ padding: '10px 0' }}>
                      <Box display="flex" alignItems="center" width="100%">
                        <Box
                          component="span"
                          sx={{
                            backgroundColor: severityColors[cve.severity],
                            color: cve.severity === 'medium' ? 'black' : 'white',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            fontFamily:'sans-serif',
                            textTransform: 'uppercase',
                            minWidth: '70px',
                            textAlign: 'center',
                            marginRight: '15px'
                          }}
                        >
                          {cve.severity}
                        </Box>
                        <Box flexGrow={1}>
                          <Typography variant="subtitle1">{cve.id}</Typography>
                          <Typography variant="body2">{cve.description}</Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>Vulnerability Breakdown</Typography>
              <Bar data={barData} options={barOptions} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };

  return (
    <>
      <Toolbar>
          {isMobile ? (
            <Select
              value={selectedTabLabel}
              onChange={handleMenuClick}
              displayEmpty
              fullWidth
            >
              <MenuItem onClick={() => handleMenuItemClick(0)} value="Home">Home</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(1)} value="Scanner Result">Scanner Result</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(2)} value="">Report</MenuItem>
            </Select>
          ) : (
            <AppBar position="static" color="default">
            <Toolbar>
              <Tabs value={mainTabValue} onChange={handleMainTabChange} aria-label="main navigation tabs" style={{ flexGrow: 1 }}>
                <StyledTab label="Home" />
                <StyledTab label="Scanner Result" />
                <StyledTab label="Report" />
              </Tabs>
              {!isTablet && (
                <Button startIcon={<ShortcutIcon />}>
                  Share Result
                </Button>
              )}
            </Toolbar>
          </AppBar>
          )}
        
      </Toolbar>
      <TabPanel value={mainTabValue} index={0}>
        {renderScannerResult()}
      </TabPanel>
      <TabPanel value={mainTabValue} index={1}>
        {renderScannerResult()}
      </TabPanel>
      <TabPanel value={mainTabValue} index={2}>
        {renderScannerResult()}
      </TabPanel>
    </>
  );
};

export default ItemDetails;
