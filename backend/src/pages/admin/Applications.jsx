import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, MenuItem, Select, Box } from '@mui/material';
import { localStorageService } from '../../services/localStorageService';

export default function Applications() {
  const [apps, setApps] = useState(localStorageService.getData('udevs_applications') || []);

  const handleStatusChange = (id, newStatus) => {
    const updated = apps.map(a => a.id === id ? { ...a, status: newStatus } : a);
    setApps(updated);
    localStorageService.setData('udevs_applications', updated);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Customer Applications</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>App ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>CNIC</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apps.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.id}</TableCell>
                <TableCell>{app.fullName}</TableCell>
                <TableCell>{app.cnic}</TableCell>
                <TableCell>{app.carMakeModel}</TableCell>
                <TableCell>{app.selectedColor}</TableCell>
                <TableCell>
                  <Select size="small" value={app.status} onChange={(e) => handleStatusChange(app.id, e.target.value)}>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Reserved">Reserved</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}