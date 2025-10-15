import React from 'react';
import { Drawer, Box, Typography, Button, Divider } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createSale } from '../api/saleService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

export default function MiniCartDrawer({ open, onClose }) {
  const { items, subtotal, clearCart } = useCart();
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

    // Confirm dialog before processing
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
      items: items.map(i => ({
        productId: i.id,
        productName: i.name,
        quantity: i.qty,
        price: i.price
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
        <Typography variant="h6" gutterBottom>🛒 Your Cart</Typography>
        <Divider sx={{ mb: 2 }} />

        {items.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty</Typography>
        ) : (
          <>
            {items.map((item) => (
              <Box key={item.id} sx={{ mb: 1 }}>
                <Typography>{item.name} × {item.qty}</Typography>
                <Typography color="text.secondary">
                  ฿{(item.price * item.qty).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
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
          </>
        )}
      </Box>
    </Drawer>
  );
}
