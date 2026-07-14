import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/auth/register', formData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setSuccess('Registration successful! Redirecting...');
                setTimeout(() => navigate('/dashboard'), 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
            <div className="card shadow-lg p-4" style={{ width: '500px', borderRadius: '15px' }}>
                <h2 className="text-center mb-3 text-primary fw-bold">QueueFlow 360</h2>
                <h5 className="text-center text-muted mb-4">Create a New Account</h5>
                
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                
                <form onSubmit={handleRegister}>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label fw-semibold">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="col">
                            <label className="form-label fw-semibold">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Phone Number</label>
                        <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Password</label>
                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required minLength="6"/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                
                <div className="text-center mt-3">
                    <small>Already have an account? <Link to="/login" className="text-decoration-none">Sign In</Link></small>
                </div>
            </div>
        </div>
    );
};

export default Register;
