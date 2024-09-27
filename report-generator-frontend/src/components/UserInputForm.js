import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';

function UserInputForm({ onSubmit }) {
  const [plannedHours, setPlannedHours] = useState('');
  const [actualHours, setActualHours] = useState('');
  const [plannedPieces, setPlannedPieces] = useState('');
  const [actualPieces, setActualPieces] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      plannedHours: Number(plannedHours),
      actualHours: Number(actualHours),
      plannedPieces: Number(plannedPieces),
      actualPieces: Number(actualPieces),
    };
    onSubmit(formData);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Enter Data
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Planned Hours"
              variant="outlined"
              fullWidth
              value={plannedHours}
              onChange={(e) => setPlannedHours(e.target.value)}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Actual Hours"
              variant="outlined"
              fullWidth
              value={actualHours}
              onChange={(e) => setActualHours(e.target.value)}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Planned Pieces"
              variant="outlined"
              fullWidth
              value={plannedPieces}
              onChange={(e) => setPlannedPieces(e.target.value)}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Actual Pieces"
              variant="outlined"
              fullWidth
              value={actualPieces}
              onChange={(e) => setActualPieces(e.target.value)}
              type="number"
              required
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default UserInputForm;
