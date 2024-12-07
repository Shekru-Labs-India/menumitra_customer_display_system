import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import OrdersScreen from './screens/OrdersScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/menumitra_customer_display_system">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginScreen />} />
        {/* <Route path="/dashboard" element={<DashboardScreen />} /> */}
        <Route path="/orders" element={<OrdersScreen />} />
        
        {/* Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
