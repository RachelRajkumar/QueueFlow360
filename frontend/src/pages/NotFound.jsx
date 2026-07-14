import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="text-muted mb-4 fs-5">The page you are looking for doesn't exist or has been moved.</p>
            <Link to="/" className="btn btn-primary btn-lg fw-bold">Return Home</Link>
        </div>
    );
};

export default NotFound;
