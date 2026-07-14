import React from 'react';

const Reports = () => {
    return (
        <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">Analytics & Reports</h2>
            <div className="card shadow-sm border-0 bg-white p-5 text-center">
                <h4 className="text-muted mb-4">Daily Queue Volume</h4>
                <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '300px', borderRadius: '10px' }}>
                    <h5 className="text-muted">Chart Placeholder (Integrate Chart.js/Recharts here)</h5>
                </div>
                <div className="mt-4 d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-primary">Daily</button>
                    <button className="btn btn-primary">Weekly</button>
                    <button className="btn btn-outline-primary">Monthly</button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
