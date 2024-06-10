import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
