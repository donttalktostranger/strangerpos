import { Product, Role, User } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', role: Role.ADMIN, name: 'System Administrator', password: '123' },
  { id: 2, username: 'cashier', role: Role.CASHIER, name: 'John Doe', password: '123' },
];

export const INITIAL_PRODUCTS: Product[] = [
  // COFFEE BASED
  { id: 101, name: 'Iced Americano (M)', category: 'Coffee Based', price: 39, stock: 100, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60' },
  { id: 102, name: 'Iced Americano (L)', category: 'Coffee Based', price: 49, stock: 100, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&auto=format&fit=crop&q=60' },
  { id: 103, name: 'Iced Latte (M)', category: 'Coffee Based', price: 49, stock: 100, image: 'https://images.unsplash.com/photo-1556381023-7a2e54146c24?w=500&auto=format&fit=crop&q=60' },
  { id: 104, name: 'Iced Latte (L)', category: 'Coffee Based', price: 59, stock: 100, image: 'https://images.unsplash.com/photo-1556381023-7a2e54146c24?w=500&auto=format&fit=crop&q=60' },
  { id: 105, name: 'Vanilla Latte (M)', category: 'Coffee Based', price: 75, stock: 100, image: 'https://images.unsplash.com/photo-1570968992193-703c15550a24?w=500&auto=format&fit=crop&q=60' },
  { id: 106, name: 'Vanilla Latte (L)', category: 'Coffee Based', price: 85, stock: 100, image: 'https://images.unsplash.com/photo-1570968992193-703c15550a24?w=500&auto=format&fit=crop&q=60' },
  { id: 107, name: 'Hazelnut Latte (M)', category: 'Coffee Based', price: 75, stock: 100, image: 'https://images.unsplash.com/photo-1630560851833-289b4e7b8b42?w=500&auto=format&fit=crop&q=60' },
  { id: 108, name: 'Hazelnut Latte (L)', category: 'Coffee Based', price: 85, stock: 100, image: 'https://images.unsplash.com/photo-1630560851833-289b4e7b8b42?w=500&auto=format&fit=crop&q=60' },
  { id: 109, name: 'Butterscotch (M)', category: 'Coffee Based', price: 75, stock: 100, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop&q=60' },
  { id: 110, name: 'Butterscotch (L)', category: 'Coffee Based', price: 85, stock: 100, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop&q=60' },
  { id: 111, name: 'Spanish Latte (M)', category: 'Coffee Based', price: 75, stock: 100, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60' },
  { id: 112, name: 'Spanish Latte (L)', category: 'Coffee Based', price: 85, stock: 100, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60' },
  { id: 113, name: 'Caramel Macchiato (M)', category: 'Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1485808191679-5f8c7c97a2fa?w=500&auto=format&fit=crop&q=60' },
  { id: 114, name: 'Caramel Macchiato (L)', category: 'Coffee Based', price: 89, stock: 100, image: 'https://images.unsplash.com/photo-1485808191679-5f8c7c97a2fa?w=500&auto=format&fit=crop&q=60' },
  { id: 115, name: 'Ube Latte (M)', category: 'Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60' },
  { id: 116, name: 'Ube Latte (L)', category: 'Coffee Based', price: 89, stock: 100, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60' },
  { id: 117, name: 'Dark Mocha (M)', category: 'Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1598282823053-93d3d63b80b7?w=500&auto=format&fit=crop&q=60' },
  { id: 118, name: 'Dark Mocha (L)', category: 'Coffee Based', price: 89, stock: 100, image: 'https://images.unsplash.com/photo-1598282823053-93d3d63b80b7?w=500&auto=format&fit=crop&q=60' },
  { id: 119, name: 'Salted Caramel (M)', category: 'Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1517210122415-b0c896562095?w=500&auto=format&fit=crop&q=60' },
  { id: 120, name: 'Salted Caramel (L)', category: 'Coffee Based', price: 89, stock: 100, image: 'https://images.unsplash.com/photo-1517210122415-b0c896562095?w=500&auto=format&fit=crop&q=60' },
  { id: 121, name: 'Nutella Latte (M)', category: 'Coffee Based', price: 89, stock: 100, image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=500&auto=format&fit=crop&q=60' },
  { id: 122, name: 'Nutella Latte (L)', category: 'Coffee Based', price: 99, stock: 100, image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=500&auto=format&fit=crop&q=60' },
  { id: 123, name: 'Biscoff Latte (M)', category: 'Coffee Based', price: 89, stock: 100, image: 'https://images.unsplash.com/photo-1579888944880-d98341245702?w=500&auto=format&fit=crop&q=60' },
  { id: 124, name: 'Biscoff Latte (L)', category: 'Coffee Based', price: 99, stock: 100, image: 'https://images.unsplash.com/photo-1579888944880-d98341245702?w=500&auto=format&fit=crop&q=60' },

  // NON-COFFEE BASED
  { id: 201, name: 'Strawberry Milk (M)', category: 'Non-Coffee Based', price: 69, stock: 100, image: 'https://images.unsplash.com/photo-1553530666-ba11a90696f9?w=500&auto=format&fit=crop&q=60' },
  { id: 202, name: 'Strawberry Milk (L)', category: 'Non-Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1553530666-ba11a90696f9?w=500&auto=format&fit=crop&q=60' },
  { id: 203, name: 'Strawberry Matcha (M)', category: 'Non-Coffee Based', price: 69, stock: 100, image: 'https://images.unsplash.com/photo-1555513476-802c019d57a3?w=500&auto=format&fit=crop&q=60' },
  { id: 204, name: 'Strawberry Matcha (L)', category: 'Non-Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1555513476-802c019d57a3?w=500&auto=format&fit=crop&q=60' },
  { id: 205, name: 'Strawberry Choco (M)', category: 'Non-Coffee Based', price: 69, stock: 100, image: 'https://images.unsplash.com/photo-1616421948486-c3cb4b047242?w=500&auto=format&fit=crop&q=60' },
  { id: 206, name: 'Strawberry Choco (L)', category: 'Non-Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1616421948486-c3cb4b047242?w=500&auto=format&fit=crop&q=60' },
  { id: 207, name: 'Strawberry Oreo (M)', category: 'Non-Coffee Based', price: 69, stock: 100, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=60' },
  { id: 208, name: 'Strawberry Oreo (L)', category: 'Non-Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=60' },
  { id: 209, name: 'Ube Milk Cream (M)', category: 'Non-Coffee Based', price: 69, stock: 100, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=60' },
  { id: 210, name: 'Ube Milk Cream (L)', category: 'Non-Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=60' },
  { id: 211, name: 'Mango Milk Cream (M)', category: 'Non-Coffee Based', price: 69, stock: 100, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&auto=format&fit=crop&q=60' },
  { id: 212, name: 'Mango Milk Cream (L)', category: 'Non-Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&auto=format&fit=crop&q=60' },
  { id: 213, name: 'Dark Chocolate (M)', category: 'Non-Coffee Based', price: 69, stock: 100, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&auto=format&fit=crop&q=60' },
  { id: 214, name: 'Dark Chocolate (L)', category: 'Non-Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&auto=format&fit=crop&q=60' },
  { id: 215, name: 'Matcha (M)', category: 'Non-Coffee Based', price: 69, stock: 100, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&auto=format&fit=crop&q=60' },
  { id: 216, name: 'Matcha (L)', category: 'Non-Coffee Based', price: 79, stock: 100, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&auto=format&fit=crop&q=60' },

  // HOT ESPRESSO
  { id: 301, name: 'Hot Americano', category: 'Hot Espresso', price: 49, stock: 100, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60' },
  { id: 302, name: 'Hot Latte', category: 'Hot Espresso', price: 59, stock: 100, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60' },
  { id: 303, name: 'Hot Cappuccino', category: 'Hot Espresso', price: 59, stock: 100, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60' },
  { id: 304, name: 'Hot Mocha', category: 'Hot Espresso', price: 59, stock: 100, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60' },
  { id: 305, name: 'Hot Spanish Latte', category: 'Hot Espresso', price: 59, stock: 100, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60' },

  // ADD ONS
  { id: 401, name: 'Espresso Shot', category: 'Add Ons', price: 20, stock: 1000, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60' },
  { id: 402, name: 'Whipped Cream', category: 'Add Ons', price: 20, stock: 1000, image: 'https://images.unsplash.com/photo-1563388757-3f8252a12948?w=500&auto=format&fit=crop&q=60' },
];

export const LOW_STOCK_THRESHOLD = 20;

// Corporate Palette
export const COLORS = {
  primary: '#004D40', // Deep Teal/Navy
  secondary: '#00695C',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  accent: '#4CAF50', // Success Green
  warning: '#FF9800',
  danger: '#E53935',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
};