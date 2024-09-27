import React from 'react';
import { Container, Typography } from '@mui/material';
import UserInputForm from './components/UserInputForm';
import axios from 'axios';
import Dashboard from './components/Dashboard'; // Ensure the import is correct

function App() {
  function handleFormSubmit(data) {
    axios.post('http://localhost:8080/api/inputs', data)
      .then((response) => {
        console.log('Data saved:', response.data);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
      </Typography>

      {/* Include Dashboard component */}
      <Dashboard />
    </Container>
  );
}

export default App;
