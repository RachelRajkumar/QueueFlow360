import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Building2, Stethoscope, Users, BarChart3 } from 'lucide-react';

const AdminLayout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <div className="bg-white border-end" style={{ width: '250px' }}>
                <div className="p-4 border-bottom">
                    <h5 className="mb-0 text-primary fw-bold">QueueFlow Admin</h5>
                </div>
                <div className="p-3">
                    <ul className="nav flex-column gap-2">
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link text-dark d-flex align-items-center gap-2">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/departments" className="nav-link text-dark d-flex align-items-center gap-2">
                                <Building2 size={18} /> Departments
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/services" className="nav-link text-dark d-flex align-items-center gap-2">
                                <Stethoscope size={18} /> Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/queue" className="nav-link text-dark d-flex align-items-center gap-2">
                                <Users size={18} /> Live Queue
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="p-3 mt-auto border-top position-absolute bottom-0 w-100" style={{maxWidth: '250px'}}>
                    <button onClick={handleLogout} className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-2 text-danger">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 bg-light">
                <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">Admin Portal</span>
                    </div>
                </nav>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
