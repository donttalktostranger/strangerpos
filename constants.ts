import { Product, Role, User } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', role: Role.ADMIN, name: 'System Administrator' },
  { id: 2, username: 'cashier', role: Role.CASHIER, name: 'John Doe' },
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Caramel Macchiato', category: 'Hot Espresso', price: 4.50, stock: 50, image: 'https://picsum.photos/200/200?random=1' },
  { id: 2, name: 'Iced Americano', category: 'Coffee', price: 3.00, stock: 120, image: 'https://picsum.photos/200/200?random=2' },
  { id: 3, name: 'Matcha Latte', category: 'Non-Coffee', price: 5.00, stock: 15, image: 'https://picsum.photos/200/200?random=3' },
  { id: 4, name: 'Cappuccino', category: 'Hot Espresso', price: 4.00, stock: 40, image: 'https://picsum.photos/200/200?random=4' },
  { id: 5, name: 'Blueberry Muffin', category: 'Snack', price: 2.50, stock: 8, image: 'https://picsum.photos/200/200?random=5' },
  { id: 6, name: 'Espresso Shot', category: 'Hot Espresso', price: 2.00, stock: 200, image: 'https://picsum.photos/200/200?random=6' },
  { id: 7, name: 'Peach Tea', category: 'Non-Coffee', price: 3.50, stock: 60, image: 'https://picsum.photos/200/200?random=7' },
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