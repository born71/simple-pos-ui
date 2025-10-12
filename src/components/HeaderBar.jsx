import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import MiniCartDrawer from './MiniCartDrawer'; // 👈 import

export default function HeaderBar() {
  const { count } = useCart();
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
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
            Store
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

          <IconButton sx={{ color: '#ccc' }} onClick={() => setOpenCart(true)}>
              <Badge badgeContent={count} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    {/* 🛒 Mini Cart Drawer */}
      <MiniCartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}
