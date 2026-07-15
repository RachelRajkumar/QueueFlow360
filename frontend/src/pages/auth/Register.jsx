import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', address: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await register(formData);
            if (user.role === 'ROLE_ADMIN') navigate('/admin');
            else navigate('/customer');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-bg py-5">
            <div className="card auth-card shadow-lg p-5 my-5" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Create Account</h2>
                    <p className="text-muted">Join QueueFlow 360 today.</p>
                </div>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Full Name</label>
                        <input type="text" className="form-control" required
                               value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Email address</label>
                        <input type="email" className="form-control" required
                               value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Phone</label>
                        <input type="text" className="form-control" required
                               value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Address</label>
                        <input type="text" className="form-control" required
                               value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-medium">Password</label>
                        <input type="password" className="form-control" required
                               value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">Register</button>
                    <div className="text-center">
                        <span className="text-muted">Already have an account? </span>
                        <Link to="/login" className="text-decoration-none fw-semibold">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
