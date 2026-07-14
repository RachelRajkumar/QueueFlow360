import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        branches: 0,
        departments: 0,
        employees: 0,
        pendingQueues: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Mock data fetch for dashboard statistics
        const fetchStats = async () => {
            try {
                // In a real scenario, this would be a single /api/v1/reports/dashboard-stats endpoint
                const branches = await api.get('/branches');
                const employees = await api.get('/employees/available');
                
                setStats({
                    branches: branches.data.length || 0,
                    departments: 5, // mocked
                    employees: employees.data.length || 0,
                    pendingQueues: 12 // mocked
                });
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            }
        };

        fetchStats();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container-fluid bg-light min-vh-100 py-4">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="text-dark fw-bold">Admin <span className="text-primary">Dashboard</span></h2>
                    <button className="btn btn-outline-danger fw-bold" onClick={handleLogout}>Logout</button>
                </div>

                <div className="row mb-5">
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 text-center py-4 bg-white rounded-3">
                            <h1 className="text-primary fw-bold display-4">{stats.pendingQueues}</h1>
                            <p className="text-muted mb-0 fw-semibold">Pending Queues</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 text-center py-4 bg-white rounded-3">
                            <h1 className="text-success fw-bold display-4">{stats.branches}</h1>
                            <p className="text-muted mb-0 fw-semibold">Active Branches</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 text-center py-4 bg-white rounded-3">
                            <h1 className="text-warning fw-bold display-4">{stats.departments}</h1>
                            <p className="text-muted mb-0 fw-semibold">Departments</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 text-center py-4 bg-white rounded-3">
                            <h1 className="text-info fw-bold display-4">{stats.employees}</h1>
                            <p className="text-muted mb-0 fw-semibold">Available Employees</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-header bg-white border-0 py-3">
                                <h5 className="mb-0 fw-bold">Recent System Activity</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                                        <div>
                                            <span className="badge bg-primary me-2">Queue</span>
                                            Token A-402 was generated for General Services.
                                        </div>
                                        <small className="text-muted">2 mins ago</small>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                                        <div>
                                            <span className="badge bg-success me-2">Appt</span>
                                            New appointment booked by Customer #1.
                                        </div>
                                        <small className="text-muted">15 mins ago</small>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                                        <div>
                                            <span className="badge bg-warning text-dark me-2">System</span>
                                            Branch "Downtown" settings updated.
                                        </div>
                                        <small className="text-muted">1 hour ago</small>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 rounded-3 bg-primary text-white">
                            <div className="card-body py-4">
                                <h4 className="fw-bold mb-3">Quick Actions</h4>
                                <button className="btn btn-light w-100 mb-2 fw-bold text-primary">Manage Branches</button>
                                <button className="btn btn-light w-100 mb-2 fw-bold text-primary">View Reports</button>
                                <button className="btn btn-light w-100 fw-bold text-primary">System Settings</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
