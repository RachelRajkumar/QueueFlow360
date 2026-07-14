import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import BookAppointment from './pages/BookAppointment';
import QueueScreen from './pages/QueueScreen';
import TokenScreen from './pages/TokenScreen';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Landing Page
const LandingPage = () => (
    <div className="container mt-5 text-center flex-grow-1">
        <h1 className="text-primary fw-bold mt-5 mb-3">Welcome to QueueFlow 360</h1>
        <p className="text-muted fs-5 mb-4">Smart Queue & Appointment Management Platform</p>
        <a href="/login" className="btn btn-primary btn-lg me-3">Login</a>
        <a href="/register" className="btn btn-outline-primary btn-lg">Register</a>
    </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1 bg-light">
              <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/queue-display" element={<QueueScreen />} />
                  
                  {/* Protected/App Routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/manager" element={<ManagerDashboard />} />
                  <Route path="/employee" element={<EmployeeDashboard />} />
                  
                  <Route path="/book-appointment" element={<BookAppointment />} />
                  <Route path="/token" element={<TokenScreen />} />
                  
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/settings" element={<Settings />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </main>
          <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
