import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100 border-end" style={{ width: '250px' }}>
            <span className="fs-5 fw-bold mb-3 text-primary px-3">Admin Panel</span>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                    <Link to="/admin" className="nav-link link-dark">
                        <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/admin/branches" className="nav-link link-dark">
                        <i className="bi bi-building me-2"></i> Branches
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/admin/employees" className="nav-link link-dark">
                        <i className="bi bi-people me-2"></i> Employees
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/reports" className="nav-link link-dark">
                        <i className="bi bi-bar-chart me-2"></i> Reports
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/settings" className="nav-link link-dark">
                        <i className="bi bi-gear me-2"></i> Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
