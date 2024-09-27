import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Typography, TextField, Paper, Button, createTheme, ThemeProvider } from '@mui/material';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    fcInbound: {
      receivingDockCases: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
      itemPrep: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
      stockControlPutaway: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
      stockControlReplenishment: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
      qualityAssurance: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
    },
    fcOutbound: {
      picking: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
      xBelt: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
      manualPack: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
      autoPack: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
      shipping: { plannedHours: '', actualHours: '', plannedPieces: '', actualPieces: '' },
    },
  });

  const [buildingTotals, setBuildingTotals] = useState({ plannedHours: 0, actualHours: 0, plannedPieces: 0, actualPieces: 0 });

  const handleChange = (e, section, department, field) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [department]: {
          ...prevData[section][department],
          [field]: value,
        },
      },
    }));
  };

  const calculatePercentage = (actual, planned) => {
    if (!actual || !planned) return 'N/A';
    return ((actual / planned) * 100).toFixed(2) + '%';
  };

  useEffect(() => {
    // Calculate building totals by summing all department values
    const sumDepartmentFields = (departments) =>
      Object.values(departments).reduce(
        (totals, dep) => ({
          plannedHours: totals.plannedHours + parseFloat(dep.plannedHours || 0),
          actualHours: totals.actualHours + parseFloat(dep.actualHours || 0),
          plannedPieces: totals.plannedPieces + parseFloat(dep.plannedPieces || 0),
          actualPieces: totals.actualPieces + parseFloat(dep.actualPieces || 0),
        }),
        { plannedHours: 0, actualHours: 0, plannedPieces: 0, actualPieces: 0 }
      );

    const inboundTotals = sumDepartmentFields(formData.fcInbound);
    const outboundTotals = sumDepartmentFields(formData.fcOutbound);

    setBuildingTotals({
      plannedHours: inboundTotals.plannedHours + outboundTotals.plannedHours,
      actualHours: inboundTotals.actualHours + outboundTotals.actualHours,
      plannedPieces: inboundTotals.plannedPieces + outboundTotals.plannedPieces,
      actualPieces: inboundTotals.actualPieces + outboundTotals.actualPieces,
    });
  }, [formData]);

  const handleFormSubmit = () => {
    console.log('Submitting form data:', formData);
    // Handle form submission logic here (e.g., send to API)
  };

  // Define a dark theme using Material-UI theme customization
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212', // Dark background for the entire app
        paper: '#1c1c1c', // Slightly lighter for the Paper components
      },
      text: {
        primary: '#ffffff',
        secondary: '#aaaaaa',
      },
    },
    typography: {
      fontFamily: 'Arial',
      h4: {
        color: '#f5f5f5', // Light color for the title
        backgroundColor: '#333333', // Dark background for the title
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        fontWeight: 'bold', // Bold title
      },
      h6: {
        fontWeight: 'bold',  // Bolden section headers
        fontSize: '1.4rem', // Increase section titles
      },
      body2: {
        color: '#f5f5f5',
        marginTop: '10px', // Add margin above percentage text
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          MWFC Daily Performance Report
        </Typography>

        {/* Building Totals Section */}
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h6" align="center" sx={{ marginBottom: '16px' }}>  {/* Title adjusted */}
            Building Totals
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField label="Planned Hours" fullWidth value={buildingTotals.plannedHours} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Actual Hours" fullWidth value={buildingTotals.actualHours} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Planned Pieces" fullWidth value={buildingTotals.plannedPieces} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Actual Pieces" fullWidth value={buildingTotals.actualPieces} InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>
        </Paper>

        {/* FC Inbound Section */}
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h6" align="center">
            FC Inbound
          </Typography>
          {['receivingDockCases', 'itemPrep', 'stockControlPutaway', 'stockControlReplenishment', 'qualityAssurance'].map(
            (department, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1">{`FC ${department.replace(/([A-Z])/g, ' $1')}`}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="Planned Hours"
                      fullWidth
                      value={formData.fcInbound[department].plannedHours}
                      onChange={(e) => handleChange(e, 'fcInbound', department, 'plannedHours')}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Actual Hours"
                      fullWidth
                      value={formData.fcInbound[department].actualHours}
                      onChange={(e) => handleChange(e, 'fcInbound', department, 'actualHours')}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Planned Pieces"
                      fullWidth
                      value={formData.fcInbound[department].plannedPieces}
                      onChange={(e) => handleChange(e, 'fcInbound', department, 'plannedPieces')}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Actual Pieces"
                      fullWidth
                      value={formData.fcInbound[department].actualPieces}
                      onChange={(e) => handleChange(e, 'fcInbound', department, 'actualPieces')}
                    />
                  </Grid>
                </Grid>
                <Typography variant="body2" align="center">
                  % HRs to Plan: {calculatePercentage(formData.fcInbound[department].actualHours, formData.fcInbound[department].plannedHours)} | % Pieces to Plan: {calculatePercentage(formData.fcInbound[department].actualPieces, formData.fcInbound[department].plannedPieces)}
                </Typography>
              </Box>
            )
          )}
        </Paper>

        {/* FC Outbound Section */}
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h6" align="center">
            FC Outbound
          </Typography>
          {['picking', 'xBelt', 'manualPack', 'autoPack', 'shipping'].map((department, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1">{`FC ${department.replace(/([A-Z])/g, ' $1')}`}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    label="Planned Hours"
                    fullWidth
                    value={formData.fcOutbound[department].plannedHours}
                    onChange={(e) => handleChange(e, 'fcOutbound', department, 'plannedHours')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Actual Hours"
                    fullWidth
                    value={formData.fcOutbound[department].actualHours}
                    onChange={(e) => handleChange(e, 'fcOutbound', department, 'actualHours')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Planned Pieces"
                    fullWidth
                    value={formData.fcOutbound[department].plannedPieces}
                    onChange={(e) => handleChange(e, 'fcOutbound', department, 'plannedPieces')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Actual Pieces"
                    fullWidth
                    value={formData.fcOutbound[department].actualPieces}
                    onChange={(e) => handleChange(e, 'fcOutbound', department, 'actualPieces')}
                  />
                </Grid>
              </Grid>
              <Typography variant="body2" align="center" sx={{ marginTop: '8px' }}> {/* Moved the percentages lower */}
                % HRs to Plan: {calculatePercentage(formData.fcOutbound[department].actualHours, formData.fcOutbound[department].plannedHours)} | % Pieces to Plan: {calculatePercentage(formData.fcOutbound[department].actualPieces, formData.fcOutbound[department].plannedPieces)}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary" onClick={handleFormSubmit}>
            Submit Data
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
