import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import CustomerLayout from './layouts/CustomerLayout';

// Pages - Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Pages - Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import Departments from './pages/admin/Departments';
import Services from './pages/admin/Services';
import LiveQueue from './pages/admin/LiveQueue';

// Pages - Customer
import CustomerDashboard from './pages/customer/CustomerDashboard';
import BookAppointment from './pages/customer/BookAppointment';
import AppointmentHistory from './pages/customer/AppointmentHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute role="ROLE_ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="services" element={<Services />} />
          <Route path="queue" element={<LiveQueue />} />
        </Route>

        {/* Customer Routes */}
        <Route path="/customer" element={
          <ProtectedRoute role="ROLE_CUSTOMER">
            <CustomerLayout />
          </ProtectedRoute>
        }>
          <Route index element={<CustomerDashboard />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="history" element={<AppointmentHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
