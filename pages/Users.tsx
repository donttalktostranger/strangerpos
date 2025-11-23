import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Role } from '../types';
import { UserPlus, Trash2, Key, Edit2, Shield, User as UserIcon, X } from 'lucide-react';

export const Users: React.FC = () => {
  const { users, addUser, deleteUser, updateUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  // New User Form State
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    role: Role.CASHIER,
    password: ''
  });

  // Password Reset State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(newUser);
    setIsModalOpen(false);
    setNewUser({ username: '', name: '', role: Role.CASHIER, password: '' });
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      updateUser({ ...selectedUser, password: newPassword });
      setIsPasswordModalOpen(false);
      setNewPassword('');
      setSelectedUser(null);
    }
  };

  const openPasswordModal = (user: User) => {
    setSelectedUser(user);
    setIsPasswordModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#004D40]">User Management</h1>
          <p className="text-gray-500 mt-1">Manage system access for cashiers and administrators.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#004D40] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#00695C] flex items-center gap-2 transition-all"
        >
          <UserPlus className="h-5 w-5" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-800">{user.name}</span>
                </td>
                <td className="p-4 text-gray-600">{user.username}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === Role.ADMIN 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role === Role.ADMIN ? <Shield className="h-3 w-3" /> : <UserIcon className="h-3 w-3" />}
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => openPasswordModal(user)}
                    className="text-yellow-600 hover:bg-yellow-50 p-2 rounded-full transition-colors"
                    title="Change Password"
                  >
                    <Key className="h-4 w-4" />
                  </button>
                  {user.username !== 'admin' && (
                    <button 
                      onClick={() => { if(confirm('Delete user?')) deleteUser(user.id); }}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#004D40] p-4 flex justify-between items-center text-white">
              <h2 className="font-bold text-lg">Create New User</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-[#004D40] focus:border-[#004D40]"
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-[#004D40] focus:border-[#004D40]"
                  value={newUser.username}
                  onChange={e => setNewUser({...newUser, username: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value as Role})}
                >
                  <option value={Role.CASHIER}>Cashier</option>
                  <option value={Role.ADMIN}>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-[#004D40] focus:border-[#004D40]"
                  value={newUser.password}
                  onChange={e => setNewUser({...newUser, password: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#4CAF50] text-white font-medium rounded-lg hover:bg-[#43A047] shadow-md">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-yellow-600 p-4 flex justify-between items-center text-white">
              <h2 className="font-bold text-lg">Change Password</h2>
              <button onClick={() => setIsPasswordModalOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handlePasswordReset} className="p-6 space-y-4">
              <p className="text-sm text-gray-600">Changing password for <span className="font-bold">{selectedUser?.name}</span>.</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-yellow-600 focus:border-yellow-600"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 shadow-md">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};