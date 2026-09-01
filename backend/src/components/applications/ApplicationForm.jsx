import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Alert, Typography } from '@mui/material';
import { validateCNIC, validatePhone, validateEmail } from '../../utils/validators';
import { localStorageService } from '../../services/localStorageService';

export const ApplicationForm = ({ car, currentUser, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    cnic: '',
    cellNumber: '',
    address: '',
    city: '',
    selectedColor: car?.availableColors?.[0] || '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = {};
    if (!formData.fullName) errs.fullName = 'Required';
    if (!validateEmail(formData.email)) errs.email = 'Invalid email';
    if (!validateCNIC(formData.cnic)) errs.cnic = 'Format: 12345-1234567-1';
    if (!validatePhone(formData.cellNumber)) errs.cellNumber = 'Format: 03001234567';
    if (!formData.address) errs.address = 'Required';
    if (!formData.city) errs.city = 'Required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const applications = localStorageService.getData('udevs_applications') || [];
    const newApp = {
      id: localStorageService.generateId('APP'),
      customerId: currentUser?.id,
      carId: car.id,
      carMakeModel: `${car.make} ${car.model}`,
      ...formData,
      status: 'Pending',
      applicationDate: new Date().toISOString()
    };

    localStorageService.setData('udevs_applications', [newApp, ...applications]);
    if (onSuccess) onSuccess(newApp);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Apply for {car.make} {car.model}</Typography>
      <TextField name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} error={!!errors.fullName} helperText={errors.fullName} required />
      <TextField name="email" label="Email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} required />
      <TextField name="cnic" label="CNIC (e.g. 35201-1234567-1)" value={formData.cnic} onChange={handleChange} error={!!errors.cnic} helperText={errors.cnic} required />
      <TextField name="cellNumber" label="Cell Number (e.g. 03001234567)" value={formData.cellNumber} onChange={handleChange} error={!!errors.cellNumber} helperText={errors.cellNumber} required />
      <TextField name="city" label="City" value={formData.city} onChange={handleChange} error={!!errors.city} helperText={errors.city} required />
      <TextField name="address" label="Current Address" value={formData.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} multiline rows={2} required />
      <TextField select name="selectedColor" label="Color" value={formData.selectedColor} onChange={handleChange}>
        {car.availableColors?.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
      </TextField>
      <TextField name="notes" label="Notes" value={formData.notes} onChange={handleChange} multiline rows={2} />
      <Button type="submit" variant="contained" color="primary">Submit Application</Button>
    </Box>
  );
};