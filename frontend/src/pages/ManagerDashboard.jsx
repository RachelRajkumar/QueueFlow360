import React from 'react';

const ManagerDashboard = () => {
    return (
        <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">Manager Dashboard</h2>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0 bg-light h-100">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Department Analytics</h5>
                            <p className="text-muted">View performance of your assigned departments.</p>
                            <button className="btn btn-primary mt-2">View Analytics</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0 bg-light h-100">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Employee Attendance</h5>
                            <p className="text-muted">Manage shift schedules and availability.</p>
                            <button className="btn btn-outline-primary mt-2">Manage Employees</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
