import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoleRoute } from './routes/RoleRoute';

import Login from './pages/auth/Login';
import AdminLayout from './components/layout/AdminLayout';
import CustomerLayout from './components/layout/CustomerLayout';

import Dashboard from './pages/admin/Dashboard';
import Cars from './pages/admin/Cars';
import Applications from './pages/admin/Applications';

import Showroom from './pages/customer/Showroom';
import MyApplications from './pages/customer/MyApplications';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<RoleRoute allowedRoles={['Admin', 'Sales Manager', 'Inventory Manager']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/cars" element={<Cars />} />
              <Route path="/admin/applications" element={<Applications />} />
            </Route>
          </Route>

          <Route element={<RoleRoute allowedRoles={['Customer']} />}>
            <Route element={<CustomerLayout />}>
              <Route path="/customer/showroom" element={<Showroom />} />
              <Route path="/customer/applications" element={<MyApplications />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}