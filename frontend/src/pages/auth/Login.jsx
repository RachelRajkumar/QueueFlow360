import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === 'ROLE_ADMIN') navigate('/admin');
            else navigate('/customer');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-bg">
            <div className="card auth-card shadow-lg p-5" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">QueueFlow 360</h2>
                    <p className="text-muted">Welcome back! Please login.</p>
                </div>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Email address</label>
                        <input type="email" className="form-control form-control-lg" required
                               value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-medium">Password</label>
                        <input type="password" className="form-control form-control-lg" required
                               value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">Login</button>
                    <div className="text-center">
                        <span className="text-muted">Don't have an account? </span>
                        <Link to="/register" className="text-decoration-none fw-semibold">Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
