import React from 'react';
import {
  Paper, Typography, Box, IconButton, Divider, Button, Avatar, Stack, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

const formatTHB = n => n.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, subtotal } = useCart();

  return (
    <Paper sx={{ p: 3, mt: 4, backgroundColor: '#1e1e1e', color: '#f5f5f5' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>🛒 Your Cart</Typography>
      <Divider sx={{ mb: 2, borderColor: '#333' }} />

      {items.length === 0 ? (
        <Typography>No items yet. Go add something!</Typography>
      ) : (
        <>
          <Stack spacing={2}>
            {items.map(item => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1, borderRadius: 2, backgroundColor: '#242424' }}>
                <Avatar
                  variant="rounded"
                  src={item.imageUrl ? `http://localhost:8080${item.imageUrl}` : undefined}
                  sx={{ width: 64, height: 64, bgcolor: '#2f2f2f' }}
                >
                  {item.name?.[0] ?? '?'}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                  <Typography variant="body2" color="grey.400">{formatTHB(item.price)}</Typography>
                </Box>

                <TextField
                  type="number"
                  size="small"
                  value={item.qty}
                  inputProps={{ min: 1, style: { textAlign: 'center', width: 60 } }}
                  onChange={(e) => {
                    const val = parseInt(e.target.value || '1', 10);
                    updateQty(item.id, Math.max(1, val));
                  }}
                  sx={{
                    '& input': { color: '#f5f5f5' },
                    '& fieldset': { borderColor: '#444' }
                  }}
                />

                <Typography sx={{ width: 120, textAlign: 'right' }}>
                  {formatTHB(item.price * item.qty)}
                </Typography>

                <IconButton onClick={() => removeItem(item.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 2, borderColor: '#333' }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="text" color="inherit" onClick={clearCart}>Clear Cart</Button>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontWeight: 600 }}>Subtotal: {formatTHB(subtotal)}</Typography>
              <Button variant="contained" sx={{ mt: 1, textTransform: 'none', borderRadius: 2 }}>
                Checkout (demo)
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
}
