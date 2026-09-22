import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-5 text-center">
                            <h2 className="mb-4 text-primary fw-bold">Welcome back, {user?.name || 'Customer'}!</h2>
                            <p className="text-muted mb-5 fs-5">
                                Manage your queue tokens and appointments easily.
                            </p>
                            
                            <div className="d-flex justify-content-center gap-4">
                                <Link to="/customer/book" className="btn btn-primary btn-lg px-4 shadow-sm">
                                    <i className="bi bi-calendar-plus me-2"></i> Book Appointment
                                </Link>
                                <Link to="/customer/history" className="btn btn-outline-secondary btn-lg px-4">
                                    <i className="bi bi-clock-history me-2"></i> View History
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
