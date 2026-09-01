import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Chip, Box } from '@mui/material';
import { localStorageService } from '../../services/localStorageService';
import { useAuth } from '../../context/AuthContext';

export default function MyApplications() {
  const { user } = useAuth();
  const allApps = localStorageService.getData('udevs_applications') || [];
  const userApps = allApps.filter(a => a.customerId === user?.id || a.email === user?.email);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>My Car Applications</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>App ID</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userApps.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.id}</TableCell>
                <TableCell>{app.carMakeModel}</TableCell>
                <TableCell>{app.selectedColor}</TableCell>
                <TableCell>{new Date(app.applicationDate).toLocaleDateString()}</TableCell>
                <TableCell><Chip label={app.status} color={app.status === 'Approved' ? 'success' : 'primary'} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}