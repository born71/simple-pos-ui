import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getUser, updateUser } from '../api/userService'; // ✅ use your service

const MySwal = withReactContent(Swal);

export default function EditUserPage() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    dateOfBirth: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      MySwal.fire({
        icon: 'warning',
        title: 'Please log in first',
        confirmButtonColor: '#000',
      }).then(() => navigate('/login'));
      return;
    }
  }, [isLoggedIn, navigate]);

  // ✅ Fetch user data from API
  useEffect(() => {
    async function loadUser() {
      if (!user?.id) return;
      setLoading(true);
      setError('');
      try {
        const data = await getUser(user.id);
        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          address: data.address || '',
          dateOfBirth: data.dateOfBirth || '',
        });
      } catch (err) {
        console.error('Failed to load user:', err);
        setError('Failed to load user information');
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.id, form); // ✅ use your service instead of raw axios
      MySwal.fire({
        icon: 'success',
        title: 'Profile updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate('/user'));
    } catch (err) {
      console.error('Update failed:', err);
      MySwal.fire({
        icon: 'error',
        title: 'Error updating profile',
        text: err.response?.data || 'Something went wrong',
        confirmButtonColor: '#000',
      });
    }
  };

  if (loading) {
    return (
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading user data...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
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

  return (
    <Paper sx={{ p: 4, mt: 4, maxWidth: 500, mx: 'auto', boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        ✏️ Edit Profile
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
      >
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={2}
        />

        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/user')}
            sx={{
              borderColor: '#000',
              color: '#000',
              '&:hover': { backgroundColor: '#000', color: '#fff' },
            }}
          >
            ← Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#000',
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
