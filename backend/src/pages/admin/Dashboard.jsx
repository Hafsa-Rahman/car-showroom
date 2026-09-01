import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { localStorageService } from '../../services/localStorageService';
import { calculateProfit } from '../../utils/calculations';

export default function Dashboard() {
  const cars = localStorageService.getData('udevs_cars') || [];
  const applications = localStorageService.getData('udevs_applications') || [];

  const totalCars = cars.length;
  const pendingApps = applications.filter(a => a.status === 'Pending').length;
  const totalProfit = cars.reduce((acc, car) => acc + calculateProfit(car.sellingPrice, car.purchaseRate).profit, 0);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Management Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography color="textSecondary">Total Inventory</Typography>
            <Typography variant="h3">{totalCars}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography color="textSecondary">Pending Applications</Typography>
            <Typography variant="h3">{pendingApps}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography color="textSecondary">Estimated Inventory Profit</Typography>
            <Typography variant="h4">PKR {totalProfit.toLocaleString()}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}