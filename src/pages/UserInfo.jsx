// src/pages/UserInfo.jsx
import React from 'react';
import { Paper, Typography, Box, Divider, Button, Stack } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UserInfo() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          ⚠️ You need to log in to view your profile.
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}
        >
          Go to Login
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 4, mt: 4, maxWidth: 500, mx: 'auto', boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>👤 Profile</Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ lineHeight: 2 }}>
        <Typography><strong>Username:</strong> {user.username}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>First Name:</strong> {user.firstName || '-'}</Typography>
        <Typography><strong>Last Name:</strong> {user.lastName || '-'}</Typography>
        <Typography><strong>Phone:</strong> {user.phone || '-'}</Typography>
        <Typography><strong>Address:</strong> {user.address || '-'}</Typography>
        <Typography><strong>Date of Birth:</strong> {user.dateOfBirth || '-'}</Typography>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#000', color: '#000', '&:hover': { backgroundColor: '#000', color: '#fff' } }}
          onClick={() => navigate('/user/edit')}
        >
          ✏️ Edit Profile
        </Button>
        <Button
          component={Link}
          to="/"
          variant="text"
          sx={{ color: '#666', '&:hover': { color: '#000' } }}
        >
          ← Back to Store
        </Button>
      </Stack>
    </Paper>
  );
}
