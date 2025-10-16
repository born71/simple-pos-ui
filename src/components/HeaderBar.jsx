import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useCart } from '../context/CartContext';
import MiniCartDrawer from './MiniCartDrawer'; 
import { useAuth } from '../context/AuthContext';

export default function HeaderBar() {
  const { count } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#fff',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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

            {/* ✅ Login or User Info */}
            {!isLoggedIn ? (
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: '#000000ff',
                  textTransform: 'none',
                  '&:hover': { color: '#fff', backgroundColor: '#2a2a2a' },
                }}
              >
                เข้าสู่ระบบ
              </Button>
            ) : (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ color: '#000000ff' }}>
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate('/user');
                    }}>
                      Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </Menu>
              </>
            )}

            {/* 🛒 Cart Icon */}
            <IconButton sx={{ color: '#000000ff' }} onClick={() => setOpenCart(true)}>
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
