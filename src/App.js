import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import HeaderBar from './components/HeaderBar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <HeaderBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
