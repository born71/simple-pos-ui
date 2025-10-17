import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import HeaderBar from './components/HeaderBar';
import StoreGrid from './components/StoreGrid';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import LoginPage from './pages/LoginPage';
import UserInfo from './pages/UserInfo';
import RegisterPage from './pages/RegisterPage';
import EditUserPage from './pages/EditUserPage';

function App() {
  return (
    <Router>
      <HeaderBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<StoreGrid />} />     
          <Route path="/inventory" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />  
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/user/edit" element={<EditUserPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
