import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api/productService';
import {
  Paper,
  Typography,
  CircularProgress,
  Button,
  Divider,
  Stack,
  Box
} from '@mui/material';
import '../styles/ProductDetails.css'

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!product) return <Typography color="error">Product not found.</Typography>;

  const backendBaseUrl = 'http://localhost:8080';
  const imageSrc = product.imageUrl
    ? `${backendBaseUrl}${product.imageUrl}`
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <Paper className="product-details-card">
      <Typography variant="h5" gutterBottom className="product-title">
        👕 Product Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* 🖼️ Product Image */}
      <Box
        component="img"
        src={imageSrc}
        alt={product.name}
        className="product-image"
      />

      {/* 🧾 Product Info */}
      <Box className="product-info">
        <Typography><strong>Name:</strong> {product.name}</Typography>
        <Typography><strong>Category:</strong> {product.category}</Typography>
        <Typography><strong>Price:</strong> ฿{product.price.toFixed(2)}</Typography>
        <Typography><strong>Stock Quantity:</strong> {product.stockQuantity}</Typography>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="left" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          className="back-button"
        >
          ← Back to Inventory
        </Button>
      </Stack>
    </Paper>
  );
}
