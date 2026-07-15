import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Calendar, Ticket } from 'lucide-react';

const CustomerDashboard = () => {
    const [queueStatus, setQueueStatus] = useState(null);
    const prevStatusRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQueueStatus();
        const interval = setInterval(fetchQueueStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchQueueStatus = async () => {
        try {
            const res = await api.get('/queue/status');
            const newStatus = res.data;
            
            // Check for status change to IN_PROGRESS using ref to avoid stale closure
            if (newStatus && prevStatusRef.current === 'WAITING' && newStatus.status === 'IN_PROGRESS') {
                alert(`🔔 Your token ${newStatus.tokenNumber} has been called!\nPlease proceed to the counter.`);
            }
            
            if (newStatus) {
                prevStatusRef.current = newStatus.status;
            }
            
            setQueueStatus(newStatus);
        } catch (error) {
            console.error('Error fetching queue status', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div>
            <h3 className="mb-4 fw-bold">My Dashboard</h3>
            
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body p-4 text-center">
                            <div className="mb-3">
                                <Ticket className="text-primary" size={48} />
                            </div>
                            <h5 className="fw-bold mb-3">Live Queue Status</h5>
                            {queueStatus ? (
                                <div>
                                    <div className="token-display mb-2">{queueStatus.tokenNumber}</div>
                                    <div className={`badge ${queueStatus.status === 'IN_PROGRESS' ? 'bg-success' : 'bg-warning text-dark'} fs-6 mb-3`}>
                                        {queueStatus.status.replace('_', ' ')}
                                    </div>
                                    <p className="text-muted mb-0">Department: {queueStatus.departmentName}</p>
                                    <p className="text-muted">Service: {queueStatus.serviceName}</p>
                                    {queueStatus.status === 'WAITING' && (
                                        <div className="alert alert-info mt-3 mb-0">
                                            <strong>Position in queue:</strong> {queueStatus.position}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <p className="text-muted mb-4">You don't have any active tokens in the queue right now.</p>
                                    <Link to="/customer/book" className="btn btn-primary">Book an Appointment</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm border-0 h-100 bg-primary-custom text-white">
                        <div className="card-body p-4 d-flex flex-column justify-content-center text-center">
                            <Calendar size={48} className="mb-3 mx-auto" />
                            <h4 className="fw-bold">Need another service?</h4>
                            <p className="opacity-75 mb-4">Book a new appointment in just a few clicks.</p>
                            <div>
                                <Link to="/customer/book" className="btn btn-light text-primary fw-bold px-4 py-2">
                                    Book Now
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
