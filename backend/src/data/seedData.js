export const seedUsers = [
  { id: 'U-1', name: 'System Admin', email: 'admin@udevs.com', password: 'Admin@123', role: 'Admin' },
  { id: 'U-2', name: 'Sales Lead', email: 'sales@udevs.com', password: 'Sales@123', role: 'Sales Manager' },
  { id: 'U-3', name: 'Stock Controller', email: 'inventory@udevs.com', password: 'Inventory@123', role: 'Inventory Manager' },
  { id: 'U-4', name: 'Customer User', email: 'customer@udevs.com', password: 'Customer@123', role: 'Customer' }
];

export const seedSuppliers = [
  { id: 'SUP-1', companyName: 'Indus Motors', contactPerson: 'Ali Khan', email: 'ali@indus.com', phone: '03001234567', city: 'Karachi', status: 'Active' },
  { id: 'SUP-2', companyName: 'Pak Suzuki Motors', contactPerson: 'Usman Ahmed', email: 'usman@paksuzuki.com', phone: '03219876543', city: 'Lahore', status: 'Active' }
];

export const seedCars = [
  {
    id: 'CAR-101',
    make: 'Toyota',
    model: 'Corolla',
    year: '2025',
    variant: 'Grande 1.8',
    purchaseRate: 6500000,
    sellingPrice: 7250000,
    availableColors: ['White', 'Black', 'Silver', 'Blue'],
    stockQuantity: 5,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    supplierId: 'SUP-1',
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=500'
  },
  {
    id: 'CAR-102',
    make: 'Honda',
    model: 'Civic',
    year: '2026',
    variant: 'RS Turbo',
    purchaseRate: 8000000,
    sellingPrice: 8900000,
    availableColors: ['Black', 'Grey', 'Red'],
    stockQuantity: 2,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    supplierId: 'SUP-1',
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500'
  }
];