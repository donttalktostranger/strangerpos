import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { POS } from './pages/POS';
import { Inventory } from './pages/Inventory';
import { Users } from './pages/Users';
import { Role } from './types';

// Private Route wrapper for Admin only pages
const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { user } = useAuth();
    return user?.role === Role.ADMIN ? children : <Navigate to="/pos" />;
};

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/pos" element={<POS />} />
        <Route path="/dashboard" element={
            <AdminRoute>
                <Dashboard />
            </AdminRoute>
        } />
        <Route path="/inventory" element={
            <AdminRoute>
                <Inventory />
            </AdminRoute>
        } />
        <Route path="/users" element={
            <AdminRoute>
                <Users />
            </AdminRoute>
        } />
        <Route path="*" element={<Navigate to="/pos" />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Router>
           <AppRoutes />
        </Router>
      </StoreProvider>
    </AuthProvider>
  );
}