import React, { useState } from 'react';
import {
  Paper, TextField, Button, Typography, Box, Divider, InputAdornment, IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect backend auth later
    console.log('Login:', form);
    navigate('/'); // redirect after login
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 360,
          p: 4,
          borderRadius: 3,
          backgroundColor: '#f7f7f7',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, textAlign: 'center' }}>
          เข้าสู่ระบบ
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="อีเมล"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="รหัสผ่าน"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              borderRadius: 2,
              backgroundColor: '#000',
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            เข้าสู่ระบบ
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: 'center', mt: 2, color: '#555' }}
          >
            ยังไม่มีบัญชี?{' '}
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              สมัครสมาชิก
            </Button>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
