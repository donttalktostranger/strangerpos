import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, Sale, SaleItem } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface StoreContextType {
  products: Product[];
  sales: Sale[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  processSale: (items: SaleItem[], total: number, cashierName: string) => void;
  lowStockCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [sales, setSales] = useState<Sale[]>([]);
  const [lowStockCount, setLowStockCount] = useState(0);

  // Update low stock count whenever products change
  useEffect(() => {
    const count = products.filter(p => p.stock <= 20).length;
    setLowStockCount(count);
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = { ...productData, id: Math.max(...products.map(p => p.id), 0) + 1 };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const processSale = (items: SaleItem[], total: number, cashierName: string) => {
    // 1. Create Sale Record
    const newSale: Sale = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      totalAmount: total,
      items,
      cashierName
    };
    setSales(prev => [...prev, newSale]);

    // 2. Reduce Inventory
    const updatedProducts = products.map(product => {
      const saleItem = items.find(item => item.productId === product.id);
      if (saleItem) {
        return { ...product, stock: Math.max(0, product.stock - saleItem.quantity) };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <StoreContext.Provider value={{ 
      products, 
      sales, 
      addProduct, 
      updateProduct, 
      deleteProduct, 
      processSale,
      lowStockCount
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};