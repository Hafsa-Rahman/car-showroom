import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Box } from '@mui/material';
import { localStorageService } from '../../services/localStorageService';
import { useAuth } from '../../context/AuthContext';
import { validateCNIC, validatePhone, validateEmail } from '../../utils/validators';

export default function Showroom() {
  const { user } = useAuth();
  const cars = localStorageService.getData('udevs_cars') || [];
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({ fullName: user?.name || '', email: user?.email || '', cnic: '', cellNumber: '', city: '', address: '', selectedColor: '' });
  const [error, setError] = useState('');

  const handleApply = (car) => {
    setSelectedCar(car);
    setFormData({ ...formData, selectedColor: car.availableColors[0] || '' });
  };

  const handleSubmit = () => {
    if (!validateEmail(formData.email)) return setError('Invalid email address');
    if (!validateCNIC(formData.cnic)) return setError('Invalid CNIC (e.g. 35201-1234567-1)');
    if (!validatePhone(formData.cellNumber)) return setError('Invalid Cell Number (e.g. 03001234567)');
    if (!formData.city || !formData.address) return setError('Please fill all required fields');

    const applications = localStorageService.getData('udevs_applications') || [];
    const newApp = {
      id: localStorageService.generateId('APP'),
      customerId: user?.id,
      carId: selectedCar.id,
      carMakeModel: `${selectedCar.make} ${selectedCar.model}`,
      ...formData,
      status: 'Pending',
      applicationDate: new Date().toISOString()
    };

    localStorageService.setData('udevs_applications', [newApp, ...applications]);
    setSelectedCar(null);
    alert('Application submitted successfully!');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Vehicle Showroom</Typography>
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card>
              <CardMedia component="img" height="180" image={car.imageUrl || 'https://via.placeholder.com/300'} />
              <CardContent>
                <Typography variant="h6">{car.make} {car.model} ({car.year})</Typography>
                <Typography color="textSecondary">PKR {Number(car.sellingPrice).toLocaleString()}</Typography>
                <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={() => handleApply(car)}>Apply Now</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedCar && (
        <Dialog open={true} onClose={() => setSelectedCar(null)} maxWidth="xs" fullWidth>
          <DialogTitle>Apply for {selectedCar.make} {selectedCar.model}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField label="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
            <TextField label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <TextField label="CNIC (e.g. 35201-1234567-1)" onChange={(e) => setFormData({ ...formData, cnic: e.target.value })} required />
            <TextField label="Cell Number (e.g. 03001234567)" onChange={(e) => setFormData({ ...formData, cellNumber: e.target.value })} required />
            <TextField label="City" onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
            <TextField label="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
            <TextField select label="Color" value={formData.selectedColor} onChange={(e) => setFormData({ ...formData, selectedColor: e.target.value })}>
              {selectedCar.availableColors.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </DialogContent>
          <Button variant="contained" onClick={handleSubmit} sx={{ m: 2 }}>Submit Application</Button>
        </Dialog>
      )}
    </Box>
  );
}