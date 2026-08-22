import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('udevs_session');
      return saved ? JSON.parse(saved) : { id: 'U-1', name: 'System Admin', email: 'admin@udevs.com', role: 'Admin' };
    } catch (e) {
      return { id: 'U-1', name: 'System Admin', email: 'admin@udevs.com', role: 'Admin' };
    }
  });

  // Always force an active admin session on mount
  useEffect(() => {
    const adminSession = { id: 'U-1', name: 'System Admin', email: 'admin@udevs.com', role: 'Admin' };
    localStorage.setItem('udevs_session', JSON.stringify(adminSession));
  }, []);

  // Login function that bypasses all validation and always succeeds
  const login = (email, password) => {
    const sessionData = {
      id: 'U-1',
      name: 'System Admin',
      email: email || 'admin@udevs.com',
      role: 'Admin'
    };
    setUser(sessionData);
    localStorage.setItem('udevs_session', JSON.stringify(sessionData));
    return { success: true, role: 'Admin' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('udevs_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);