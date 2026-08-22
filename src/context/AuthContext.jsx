import React, { createContext, useContext, useState, useEffect } from 'react';
import { localStorageService } from '../services/localStorageService';
import { seedUsers } from '../data/seedUsers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const users = localStorageService.getData('udevs_users');
    if (!users) {
      localStorageService.setData('udevs_users', seedUsers);
    }
    const session = localStorageService.getData('udevs_session');
    if (session) setUser(session);
  }, []);

  const login = (email, password) => {
    const users = localStorageService.getData('udevs_users') || seedUsers;
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const sessionData = { id: found.id, name: found.name, email: found.email, role: found.role };
      setUser(sessionData);
      localStorageService.setData('udevs_session', sessionData);
      return { success: true, role: found.role };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem('udevs_session', 'null');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);