import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { localStorageService } from '../../services/localStorageService';
import { calculateProfit } from '../../utils/calculations';

export default function Cars() {
  const [cars, setCars] = useState(localStorageService.getData('udevs_cars') || []);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ make: '', model: '', year: '2026', purchaseRate: '', sellingPrice: '', stockQuantity: 1, availableColors: 'White, Black' });

  const handleSave = () => {
    const newCar = {
      id: localStorageService.generateId('CAR'),
      ...formData,
      purchaseRate: Number(formData.purchaseRate),
      sellingPrice: Number(formData.sellingPrice),
      availableColors: formData.availableColors.split(',').map(c => c.trim()),
      status: 'Available',
      supplierId: 'SUP-1'
    };
    const updated = [...cars, newCar];
    setCars(updated);
    localStorageService.setData('udevs_cars', updated);
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Car Inventory</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Vehicle</Button>
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Purchase Rate</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Profit</TableCell>
              <TableCell>Margin</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => {
              const { profit, margin } = calculateProfit(car.sellingPrice, car.purchaseRate);
              return (
                <TableRow key={car.id}>
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.make} {car.model} ({car.year})</TableCell>
                  <TableCell>PKR {Number(car.purchaseRate).toLocaleString()}</TableCell>
                  <TableCell>PKR {Number(car.sellingPrice).toLocaleString()}</TableCell>
                  <TableCell>PKR {profit.toLocaleString()}</TableCell>
                  <TableCell>{margin}%</TableCell>
                  <TableCell>{car.stockQuantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Vehicle</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Make" onChange={(e) => setFormData({ ...formData, make: e.target.value })} />
          <TextField label="Model" onChange={(e) => setFormData({ ...formData, model: e.target.value })} />
          <TextField label="Purchase Rate" type="number" onChange={(e) => setFormData({ ...formData, purchaseRate: e.target.value })} />
          <TextField label="Selling Price" type="number" onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}