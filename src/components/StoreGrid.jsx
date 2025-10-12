import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productService';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function StoreGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  const backendBaseUrl = 'http://localhost:8080';

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
        🏬 Storefront
      </Typography>

      <Grid container spacing={3}>
        {products.map(product => {
          const imageSrc = product.imageUrl
            ? `${backendBaseUrl}${product.imageUrl}`
            : 'https://via.placeholder.com/300x300?text=No+Image';

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 280,
                  minHeight: 320,
                  backgroundColor: '#f8f8f8',
                  borderRadius: 2,
                  boxShadow: 2,
                  mx: 'auto',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  width="100%"
                  image={imageSrc}
                  alt={product.name}
                  sx={{ objectFit: 'cover', borderBottom: '1px solid #ddd' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    ฿{product.price.toFixed(2)}
                  </Typography>

                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                      '&:hover': { backgroundColor: '#333' },
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => addItem(product, 1)}        // 👈 add here
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      px: 2, py: 0.5,
                      ml: 2
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
