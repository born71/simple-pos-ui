import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation before sending to backend
    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      MySwal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        text: 'Please fill in all fields before registering.',
        confirmButtonColor: '#000',
      });
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', form);
      console.log('Register success:', res.data);

      MySwal.fire({
        icon: 'success',
        title: 'Registration successful!',
        text: 'You can now log in to your account.',
        confirmButtonColor: '#000',
        timer: 2000,
      }).then(() => navigate('/login'));
    } catch (err) {
      console.error('Register error:', err);

      MySwal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: err.response?.data || 'Something went wrong. Please try again.',
        confirmButtonColor: '#000',
      });
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 4, maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>สมัครสมาชิก</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          variant="outlined"
          margin="normal"
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={form.password}
          onChange={handleChange}
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
          Register
        </Button>
      </form>

      <Typography sx={{ mt: 2, fontSize: 14 }}>
        Already have an account?{' '}
        <Link to="/login" style={{ textDecoration: 'none', color: '#000' }}>
          Log in
        </Link>
      </Typography>
    </Paper>
  );
}
