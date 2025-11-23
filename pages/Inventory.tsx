import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Edit2, Trash2, AlertTriangle, Plus, X, Upload } from 'lucide-react';

export const Inventory: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', category: 'Coffee Based', price: 0, stock: 0
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: 'Coffee Based', price: 0, stock: 0 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...formData } as Product);
    } else {
      addProduct({ ...formData, image: 'https://picsum.photos/200/300?random=' + Math.random() } as Product);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if(confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-[#004D40]">Inventory Management</h1>
            <p className="text-gray-500 mt-1">Manage products, stock levels, and prices.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#004D40] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#00695C] flex items-center gap-2 transition-all"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={product.image} alt="" className="h-10 w-10 rounded-md object-cover bg-gray-200" />
                  <span className="font-medium text-gray-800">{product.name}</span>
                </td>
                <td className="p-4 text-gray-600">
                  <span className="bg-gray-100 text-gray-600 py-1 px-2 rounded text-xs uppercase font-bold tracking-wide">
                    {product.category}
                  </span>
                </td>
                <td className="p-4 font-medium text-gray-700">${product.price.toFixed(2)}</td>
                <td className="p-4">
                  <div className={`flex items-center gap-2 font-bold ${product.stock <= 20 ? 'text-red-500' : 'text-green-600'}`}>
                    {product.stock}
                    {product.stock <= 20 && <AlertTriangle className="h-4 w-4" />}
                  </div>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(product)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#004D40] p-4 flex justify-between items-center text-white">
              <h2 className="font-bold text-lg">{editingProduct ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-[#004D40] focus:border-[#004D40]"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as Product['category']})}
                  >
                    <option value="Coffee Based">Coffee Based</option>
                    <option value="Non-Coffee Based">Non-Coffee Based</option>
                    <option value="Hot Espresso">Hot Espresso</option>
                    <option value="Add Ons">Add Ons</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input 
                  type="number" 
                  required
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#4CAF50] text-white font-medium rounded-lg hover:bg-[#43A047] shadow-md">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};