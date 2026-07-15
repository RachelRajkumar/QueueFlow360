import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Calendar, Activity, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/dashboard');
            setStats(res.data);
        } catch (error) {
            console.error('Error fetching stats', error);
        }
    };

    if (!stats) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div>
            <h4 className="mb-4 fw-bold">Dashboard Overview</h4>
            <div className="row g-4">
                <div className="col-md-3">
                    <div className="card h-100 border-0 shadow-sm p-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                <Users className="text-primary" size={24} />
                            </div>
                            <h6 className="mb-0 text-muted">Total Customers</h6>
                        </div>
                        <h2 className="fw-bold mb-0">{stats.totalCustomers}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card h-100 border-0 shadow-sm p-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                                <Calendar className="text-success" size={24} />
                            </div>
                            <h6 className="mb-0 text-muted">Today's Appointments</h6>
                        </div>
                        <h2 className="fw-bold mb-0">{stats.todaysAppointments}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card h-100 border-0 shadow-sm p-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                                <Activity className="text-warning" size={24} />
                            </div>
                            <h6 className="mb-0 text-muted">Waiting Tokens</h6>
                        </div>
                        <h2 className="fw-bold mb-0">{stats.waitingTokens}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card h-100 border-0 shadow-sm p-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                                <CheckCircle className="text-info" size={24} />
                            </div>
                            <h6 className="mb-0 text-muted">Completed Tokens</h6>
                        </div>
                        <h2 className="fw-bold mb-0">{stats.completedTokens}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
