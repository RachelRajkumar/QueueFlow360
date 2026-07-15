import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CustomerLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            {/* Top Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary-custom shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/customer">QueueFlow 360</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/customer">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/customer/book">Book Appointment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/customer/history">History</Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center gap-3">
                            <span className="text-white-50">Welcome, {user?.name}</span>
                            <button onClick={handleLogout} className="btn btn-light btn-sm fw-medium">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container py-4 flex-grow-1">
                <Outlet />
            </div>
            
            {/* Footer */}
            <footer className="bg-white py-3 border-top text-center text-muted mt-auto">
                <small>&copy; 2026 QueueFlow 360. All rights reserved.</small>
            </footer>
        </div>
    );
};

export default CustomerLayout;
