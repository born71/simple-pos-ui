import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createSale } from '../api/saleService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

export default function MiniCartDrawer({ open, onClose }) {
  const { items, subtotal, clearCart, removeItem } = useCart();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      MySwal.fire({
        icon: 'info',
        title: 'Please log in first',
        text: 'You must log in before checkout.',
        confirmButtonColor: '#000',
      }).then(() => navigate('/login'));
      return;
    }

    const result = await MySwal.fire({
      title: 'Confirm Checkout?',
      text: `Your total is ฿${subtotal.toFixed(2)}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Yes, checkout',
    });

    if (!result.isConfirmed) return;

    const payload = {
      userId: user?.id,
      items: items.map((i) => ({
        productId: i.id,
        productName: i.name,
        quantity: i.qty,
        price: i.price,
      })),
    };

    try {
      await createSale(payload);
      clearCart();
      MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your order has been placed successfully.',
        confirmButtonColor: '#000',
      });
      onClose();
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: 'error',
        title: 'Checkout failed',
        text: 'Something went wrong while processing your order.',
        confirmButtonColor: '#000',
      });
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 360, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          🛒 Your Cart
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {items.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty</Typography>
        ) : (
          <>
            {items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mb: 1,
                  py: 0.5,
                  borderBottom: '1px solid #eee',
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 500 }}>
                    {item.name} × {item.qty}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                    ฿{(item.price * item.qty).toFixed(2)}
                  </Typography>
                </Box>

                <IconButton
                  color="error"
                  size="small"
                  onClick={() => removeItem(item.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Total: ฿{subtotal.toFixed(2)}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                textTransform: 'none',
                backgroundColor: '#000',
                '&:hover': { backgroundColor: '#333' },
              }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>

            <Button
              fullWidth
              variant="text"
              color="error"
              sx={{
                mt: 1,
                textTransform: 'none',
              }}
              onClick={() => {
                MySwal.fire({
                  title: 'Clear all items?',
                  text: 'This will remove everything from your cart.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, clear all',
                  confirmButtonColor: '#000',
                  cancelButtonColor: '#ccc',
                }).then((res) => {
                  if (res.isConfirmed) clearCart();
                });
              }}
            >
              Clear Cart
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}
