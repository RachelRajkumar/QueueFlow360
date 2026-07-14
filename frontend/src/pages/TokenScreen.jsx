import React from 'react';

const TokenScreen = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="card shadow border-0 text-center p-5" style={{ width: '400px', borderRadius: '20px' }}>
                <h4 className="text-muted mb-2">QueueFlow 360</h4>
                <h2 className="fw-bold mb-4">Your Token</h2>
                
                <div className="bg-light py-4 rounded-3 mb-4 border border-2 border-primary">
                    <h1 className="display-3 fw-bold text-primary m-0">A-406</h1>
                </div>
                
                <p className="mb-1 text-muted">Department: <strong>General Services</strong></p>
                <p className="mb-4 text-muted">Estimated Wait Time: <strong>15 mins</strong></p>
                
                <div className="mb-4">
                    {/* Placeholder for QR Code */}
                    <div className="bg-secondary mx-auto d-flex align-items-center justify-content-center" style={{ width: '150px', height: '150px' }}>
                        <span className="text-white fw-bold">QR CODE</span>
                    </div>
                </div>

                <button className="btn btn-primary btn-lg w-100 fw-bold d-print-none" onClick={handlePrint}>
                    <i className="bi bi-printer me-2"></i> Print Token
                </button>
            </div>
        </div>
    );
};

export default TokenScreen;
