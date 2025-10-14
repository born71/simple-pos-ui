import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, TextField, Paper, Typography } from '@mui/material';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = '/';   // redirect after login
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 4, maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>เข้าสู่ระบบ</Typography>
      {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, width: '100%' }}>
          Login
        </Button>
      </form>
    </Paper>
  );
}
