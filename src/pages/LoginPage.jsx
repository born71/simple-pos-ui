import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend quick validation
    if (!email.trim() || !password.trim()) {
      MySwal.fire({
        icon: 'warning',
        title: 'Missing information',
        text: 'Please fill in both email and password.',
        confirmButtonColor: '#000',
      });
      return;
    }

    try {
      await login(email, password);
      MySwal.fire({
        icon: 'success',
        title: 'Login successful!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = '/';
      });
    } catch (err) {
      console.error('Login failed:', err);

      // ✅ show backend message if available, otherwise fallback
      const message =
        err.response?.data ||
        err.message ||
        'Unable to log in. Please try again.';

      MySwal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: typeof message === 'string' ? message : 'Invalid email or password',
        confirmButtonColor: '#000',
      });
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 4, maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>เข้าสู่ระบบ</Typography>

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

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            width: '100%',
            backgroundColor: '#000',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          Login
        </Button>
      </form>

      <Typography sx={{ mt: 2, fontSize: 14 }}>
        Don’t have an account?{' '}
        <Link to="/register" style={{ textDecoration: 'none', color: '#000' }}>
          Register here
        </Link>
      </Typography>
    </Paper>
  );
}
