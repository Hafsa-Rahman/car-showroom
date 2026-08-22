const KEYS = {
  USERS: 'udevs_users',
  SESSION: 'udevs_session',
  CARS: 'udevs_cars',
  SUPPLIERS: 'udevs_suppliers',
  CUSTOMERS: 'udevs_customers',
  APPLICATIONS: 'udevs_applications',
  NOTIFICATIONS: 'udevs_notifications',
  LOGS: 'udevs_activity_logs',
};

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

  generateId: (prefix = 'ID') => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`.toUpperCase(),

  seedInitialData: (seeds) => {
    Object.entries(seeds).forEach(([key, value]) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });
  }
};