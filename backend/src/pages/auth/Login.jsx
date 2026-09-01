import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Alert, Paper } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('admin@udevs.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(email, password);

    if (!res.success) {
      setError(res.message);
    } else {
      if (res.role === 'Customer') {
        navigate('/customer/showroom', { replace: true });
      } else {
        navigate('/admin/dashboard', { replace: true });
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" align="center" fontWeight="bold">U Devs Portal Login</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField 
            label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <TextField 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Button type="submit" variant="contained" size="large">Login</Button>
        </Box>
      </Paper>
    </Container>
  );
}