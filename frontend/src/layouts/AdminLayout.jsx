import React, { useContext } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Building2, Stethoscope, Activity, History } from 'lucide-react';

const AdminLayout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkClass = ({ isActive }) =>
        `nav-link d-flex align-items-center mb-2 p-2 rounded ${
            isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'
        }`;

    return (
        <div 
        className="d-flex"
        style={{minHeight:"100vh"}}
        >
        
        <div 
        className="bg-white border-end d-flex flex-column"
        style={{width:"250px"}}
        >
        
        
        <div className="p-4 border-bottom">
        <h5 className="text-primary fw-bold mb-0">
        QueueFlow Admin
        </h5>
        </div>
        
        
        
        <div className="p-3">
        
        <nav className="nav flex-column">
            <NavLink to="/admin" end className={navLinkClass}>
                <LayoutDashboard size={20} className="me-2" />
                Dashboard
            </NavLink>
            <NavLink to="/admin/departments" className={navLinkClass}>
                <Building2 size={20} className="me-2" />
                Departments
            </NavLink>
            <NavLink to="/admin/services" className={navLinkClass}>
                <Stethoscope size={20} className="me-2" />
                Services
            </NavLink>
            <NavLink to="/admin/queue" className={navLinkClass}>
                <Activity size={20} className="me-2" />
                Live Queue
            </NavLink>
            <NavLink to="/admin/appointments" className={navLinkClass}>
                <History size={20} className="me-2" />
                History
            </NavLink>
        </nav>
        
        </div>
        
        
        
        <div className="p-3 border-top mt-auto">
        
        <button 
        onClick={handleLogout}
        className="btn btn-light w-100 text-danger"
        >
        
        <LogOut size={18}/>
         Logout
        
        </button>
        
        
        </div>
        
        
        </div>
        
        
        <div className="flex-grow-1 bg-light">
        
        <nav className="navbar navbar-light bg-white border-bottom px-4 py-3 d-flex justify-content-between">
        <span className="navbar-brand mb-0 h1">Admin Portal</span>
        <button 
        onClick={handleLogout}
        className="btn btn-outline-danger d-flex align-items-center gap-2"
        >
            <LogOut size={18}/>
            Logout
        </button>
        </nav>
        
        
        <div className="p-4">
        
        <Outlet />
        
        </div>
        
        
        </div>
        
        
        </div>
    );
};

export default AdminLayout;