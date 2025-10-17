import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getUser } from '../api/userService';

export default function UserInfo() {
  const { isLoggedIn, user: authUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch user data from API when logged in
  useEffect(() => {
    async function fetchUser() {
      if (!authUser?.id) return;
      setLoading(true);
      setError('');
      try {
        const data = await getUser(authUser.id);
        setProfile(data);
      } catch (err) {
        console.error('Failed to load user:', err);
        setError(err?.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn, authUser]);

  // ✅ Case 1: User not logged in
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

  // ✅ Case 2: Loading state
  if (loading) {
    return (
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your profile…</Typography>
      </Paper>
    );
  }

  // ✅ Case 3: No data found or error
  if (error) {
    return (
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}
        >
          Retry
        </Button>
      </Paper>
    );
  }

  // ✅ Case 4: Successfully loaded profile
  return (
    <Paper sx={{ p: 4, mt: 4, maxWidth: 500, mx: 'auto', boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>👤 Profile</Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ lineHeight: 2 }}>
        <Typography><strong>Username:</strong> {profile?.username ?? authUser?.username ?? '-'}</Typography>
        <Typography><strong>Email:</strong> {profile?.email ?? authUser?.email ?? '-'}</Typography>
        <Typography><strong>First Name:</strong> {profile?.firstName ?? '-'}</Typography>
        <Typography><strong>Last Name:</strong> {profile?.lastName ?? '-'}</Typography>
        <Typography><strong>Phone:</strong> {profile?.phone ?? '-'}</Typography>
        <Typography><strong>Address:</strong> {profile?.address ?? '-'}</Typography>
        <Typography><strong>Date of Birth:</strong> {profile?.dateOfBirth ?? '-'}</Typography>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          component={Link}
          to="/user/edit"
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#000', '&:hover': { backgroundColor: '#333' } }}
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
