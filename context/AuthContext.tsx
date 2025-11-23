import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  users: User[]; // List of all users for Admin management
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void; // For password changes
  deleteUser: (id: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const login = (username: string, password?: string) => {
    const foundUser = users.find(u => u.username === username);
    if (foundUser) {
      if (foundUser.password && foundUser.password !== password) {
        return false;
      }
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser = { ...userData, id: Math.max(...users.map(u => u.id), 0) + 1 };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      users,
      login, 
      logout, 
      isAuthenticated: !!user,
      addUser,
      updateUser,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};