export enum Role {
  ADMIN = 'ADMIN',
  CASHIER = 'CASHIER'
}

export interface User {
  id: number;
  username: string;
  role: Role;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category: 'Coffee' | 'Non-Coffee' | 'Hot Espresso' | 'Snack';
  price: number;
  stock: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SaleItem {
  productId: number;
  productName: string;
  quantity: number;
  priceAtSale: number;
}

export interface Sale {
  id: string;
  date: string; // ISO String
  totalAmount: number;
  items: SaleItem[];
  cashierName: string;
}

export interface SalesReport {
  date: string;
  total: number;
}