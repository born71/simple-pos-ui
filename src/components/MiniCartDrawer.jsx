import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Avatar,
  Stack,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

const formatTHB = n => n.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });

export default function MiniCartDrawer({ open, onClose }) {
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart();

  return (
    <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        ModalProps={{
            keepMounted: true, // performance
            BackdropProps: { sx: { backgroundColor: 'rgba(0,0,0,0.4)' } },
        }}
    >
      <Box sx={{ width: 350, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Empty State */}
        {items.length === 0 ? (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
              {items.map(item => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={item.imageUrl ? `http://localhost:8080${item.imageUrl}` : undefined}
                    sx={{ width: 56, height: 56 }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatTHB(item.price)}
                    </Typography>
                    <TextField
                      type="number"
                      size="small"
                      value={item.qty}
                      inputProps={{ min: 1, style: { textAlign: 'center', width: 50 } }}
                      onChange={(e) => {
                        const val = parseInt(e.target.value || '1', 10);
                        updateQty(item.id, Math.max(1, val));
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': { height: 28, fontSize: 13 },
                        mt: 0.5,
                      }}
                    />
                  </Box>

                  <IconButton size="small" onClick={() => removeItem(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />
            {/* Footer */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Subtotal: {formatTHB(subtotal)}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={clearCart}
                >
                  Clear
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => alert('Proceed to checkout (coming soon)')}
                >
                  Checkout
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
