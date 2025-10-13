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
import '../styles/ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        if (res && res.data) {
          setProduct(res.data);
        } else {
          console.warn("⚠️ No product from API — using placeholder");
          setUseMock(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        console.warn("⚠️ API unreachable — showing mock product");
        setUseMock(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  // ✅ Use mock placeholder when backend is down
  const productData = useMock
    ? {
        name: "Sample Product",
        category: "Demo Category",
        price: 0.0,
        stockQuantity: 0,
        imageUrl: "https://via.placeholder.com/400x400?text=Sample+Product",
      }
    : product;

  if (!productData) return <Typography color="error">Product not found.</Typography>;

  const backendBaseUrl = 'http://localhost:8080';
  const imageSrc = productData.imageUrl
    ? productData.imageUrl.startsWith("http")
      ? productData.imageUrl
      : `${backendBaseUrl}${productData.imageUrl}`
    : 'https://via.placeholder.com/400x400?text=No+Image';

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
        alt={productData.name}
        className="product-image"
      />

      {/* 🧾 Product Info */}
      <Box className="product-info">
        <Typography><strong>Name:</strong> {productData.name}</Typography>
        <Typography><strong>Category:</strong> {productData.category}</Typography>
        <Typography><strong>Price:</strong> ฿{productData.price.toFixed(2)}</Typography>
        <Typography><strong>Stock Quantity:</strong> {productData.stockQuantity}</Typography>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="left" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          className="back-button"
        >
          ← Back to Store
        </Button>
      </Stack>

      {/* ⚠️ Mock Mode Notice */}
      {useMock && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 3,
            textAlign: "center",
            fontStyle: "italic",
            opacity: 0.7,
          }}
        >
          ⚠️ Offline Mode: Showing sample product data
        </Typography>
      )}
    </Paper>
  );
}
