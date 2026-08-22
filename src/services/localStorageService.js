import { seedUsers, seedSuppliers, seedCars } from '../data/seedData';

export const localStorageService = {
  getData: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error reading ${key}:`, e);
      return null;
    }
  },

  setData: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving ${key}:`, e);
    }
  },

  generateId: (prefix = 'ID') => `${prefix}-${Date.now().toString(36).toUpperCase()}`,

  initializeSeedData: () => {
    // Always enforce seeding if missing or empty
    const existingUsers = localStorage.getItem('udevs_users');
    if (!existingUsers || JSON.parse(existingUsers).length === 0) {
      localStorage.setItem('udevs_users', JSON.stringify(seedUsers));
    }
    if (!localStorage.getItem('udevs_suppliers')) {
      localStorage.setItem('udevs_suppliers', JSON.stringify(seedSuppliers));
    }
    if (!localStorage.getItem('udevs_cars')) {
      localStorage.setItem('udevs_cars', JSON.stringify(seedCars));
    }
    if (!localStorage.getItem('udevs_applications')) {
      localStorage.setItem('udevs_applications', JSON.stringify([]));
    }
  }
};