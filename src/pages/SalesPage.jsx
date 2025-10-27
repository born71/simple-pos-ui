import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';
import { getSalesSummary, getTopProducts, getDailySales } from '../api/salesService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesPage() {
  const [summary, setSummary] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryRes, topRes, dailyRes] = await Promise.all([
          getSalesSummary(),
          getTopProducts(),
          getDailySales(),
        ]);
        setSummary(summaryRes.data);
        setTopProducts(topRes.data);
        setDailySales(dailyRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load sales data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading sales analytics...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>📊 Sales Dashboard</Typography>
      <Divider sx={{ mb: 3 }} />

      {/* ✅ Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h4" sx={{ color: '#1976d2' }}>
              {summary?.total_sales || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4" sx={{ color: '#2e7d32' }}>
              ฿{summary?.total_revenue?.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* ✅ Daily Sales Chart */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Daily Revenue</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="dailyTotal" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* ✅ Top Products Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Top Selling Products</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Product</strong></TableCell>
              <TableCell align="right"><strong>Sold</strong></TableCell>
              <TableCell align="right"><strong>Revenue (฿)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topProducts.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.product}</TableCell>
                <TableCell align="right">{item.totalSold}</TableCell>
                <TableCell align="right">
                  {item.totalRevenue.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
