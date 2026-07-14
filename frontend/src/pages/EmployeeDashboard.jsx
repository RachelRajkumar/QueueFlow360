import React, { useState } from 'react';

const EmployeeDashboard = () => {
    const [counterStatus, setCounterStatus] = useState('AVAILABLE');

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">Employee Counter Panel</h2>
                <div className="d-flex align-items-center">
                    <span className="me-2 fw-semibold">Status:</span>
                    <select 
                        className={`form-select fw-bold ${counterStatus === 'AVAILABLE' ? 'text-success' : 'text-danger'}`}
                        value={counterStatus}
                        onChange={(e) => setCounterStatus(e.target.value)}
                    >
                        <option value="AVAILABLE" className="text-success">AVAILABLE</option>
                        <option value="BUSY" className="text-warning">BUSY</option>
                        <option value="OFFLINE" className="text-danger">OFFLINE</option>
                    </select>
                </div>
            </div>

            <div className="card shadow-sm border-0 text-center py-5 bg-white mb-4">
                <h4 className="text-muted mb-3">Next Customer In Queue</h4>
                <h1 className="display-1 fw-bold text-primary mb-4">A-403</h1>
                <div>
                    <button className="btn btn-success btn-lg me-3 px-5">Call Next</button>
                    <button className="btn btn-outline-danger btn-lg px-5">Skip</button>
                </div>
            </div>
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0 py-3">
                    <h5 className="mb-0 fw-bold">Waiting List</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            A-404 <span className="badge bg-secondary rounded-pill">Wait: 5m</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            A-405 <span className="badge bg-secondary rounded-pill">Wait: 12m</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
