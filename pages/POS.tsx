import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { CartItem, Product } from '../types';
// Fix: Import ShoppingCart from lucide-react as it is used in the component
import { Search, Trash2, Plus, Minus, CreditCard, AlertCircle, Receipt, ShoppingCart } from 'lucide-react';

export const POS: React.FC = () => {
  const { products, processSale } = useStore();
  const { user } = useAuth();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSaleTotal, setLastSaleTotal] = useState(0);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, selectedCategory, searchTerm]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Cart Logic
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev; // Prevent overselling
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        const stockLimit = products.find(p => p.id === id)?.stock || 0;
        if (newQty > stockLimit) return item;
        return { ...item, quantity: Math.max(0, newQty) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12; // 12% VAT simulation
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processSale(
        cart.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          priceAtSale: item.price
        })), 
        total, 
        user?.name || 'Unknown'
      );
      setLastSaleTotal(total);
      setCart([]);
      setIsProcessing(false);
      setShowReceipt(true);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Product Grid Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm z-10 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-[#004D40] focus:border-[#004D40]"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
             {categories.map(cat => (
               <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                  ? 'bg-[#004D40] text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
               >
                 {cat}
               </button>
             ))}
           </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all hover:shadow-md group ${product.stock === 0 ? 'opacity-60 pointer-events-none' : ''}`}
              >
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                      OUT OF STOCK
                    </div>
                  )}
                  {product.stock > 0 && product.stock <= 20 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow">
                      Low Stock: {product.stock}
                    </div>
                  )}
                </div>
                <div className="p-4">
                   <div className="flex justify-between items-start mb-1">
                     <h3 className="font-semibold text-gray-800 leading-tight">{product.name}</h3>
                     <span className="font-bold text-[#004D40]">${product.price.toFixed(2)}</span>
                   </div>
                   <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-96 bg-white shadow-2xl flex flex-col h-full border-l border-gray-200">
        <div className="p-5 border-b border-gray-100 bg-[#004D40] text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Current Order
          </h2>
          <p className="text-xs opacity-80 mt-1">Transaction ID: #{Math.floor(Math.random() * 10000)}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCart className="h-12 w-12 mb-3 opacity-20" />
              <p>Cart is empty</p>
              <p className="text-xs">Select products to begin</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="h-12 w-12 rounded-md bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)} / unit</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 rounded-full hover:bg-gray-200 text-gray-600"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 rounded-full hover:bg-gray-200 text-gray-600"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 ml-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-5 bg-gray-50 border-t border-gray-200">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>VAT (12%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#004D40] pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0 || isProcessing}
            className="w-full py-3 px-4 bg-[#4CAF50] hover:bg-[#43A047] disabled:bg-gray-300 text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {isProcessing ? 'Processing...' : (
              <>
                <CreditCard className="h-5 w-5" />
                Process Payment
              </>
            )}
          </button>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
             <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="h-8 w-8" />
             </div>
             <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h2>
             <p className="text-gray-500 mb-6">Total Amount: <span className="font-bold text-gray-900">${lastSaleTotal.toFixed(2)}</span></p>
             <button 
               onClick={() => setShowReceipt(false)}
               className="w-full bg-[#004D40] text-white py-2 rounded-lg hover:bg-[#00695C]"
             >
               New Transaction
             </button>
          </div>
        </div>
      )}
    </div>
  );
};