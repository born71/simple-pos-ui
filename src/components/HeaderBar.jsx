import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HeaderBar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#fff', // dark gray / black
        boxShadow: '1px',
        borderBottom: '2px solid #0f03033f',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side — brand */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            color: '#000000ff',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          Bon Voyage
        </Typography>

        {/* Right side — navigation */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: '#000000ff',
              textTransform: 'none',
              '&:hover': { color: '#fff', backgroundColor: '#2a2a2a' },
            }}
          >
            Inventory
          </Button>
          <Button
            component={Link}
            to="/sales"
            sx={{
              color: '#000000ff',
              textTransform: 'none',
              '&:hover': { color: '#fff', backgroundColor: '#2a2a2a' },
            }}
          >
            Sales
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            sx={{
              color: '#000000ff',
              textTransform: 'none',
              '&:hover': { color: '#fff', backgroundColor: '#2a2a2a' },
            }}
          >
            Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
