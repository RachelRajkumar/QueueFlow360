import { useState, useEffect } from 'react';
import api from '../../services/api';
import { PlayCircle, CheckCircle, XCircle } from 'lucide-react';

const LiveQueue = () => {
    const [waitingTokens, setWaitingTokens] = useState([]);
    const [servingTokens, setServingTokens] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQueue();
        const interval = setInterval(fetchQueue, 5000); // auto refresh every 5s
        return () => clearInterval(interval);
    }, []);

    const fetchQueue = async () => {
        try {
            const [waitingRes, servingRes] = await Promise.all([
                api.get('/queue/waiting'),
                api.get('/queue/serving')
            ]);
            setWaitingTokens(waitingRes.data);
            setServingTokens(servingRes.data);
        } catch (error) {
            console.error("Error fetching queue", error);
        }
    };

    const handleCallNext = async () => {
        setLoading(true);
        try {
            await api.post('/queue/call-next');
            fetchQueue();
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (tokenNumber) => {
        await api.post(`/queue/complete/${tokenNumber}`);
        fetchQueue();
    };

    const handleSkip = async (tokenNumber) => {
        await api.post(`/queue/skip/${tokenNumber}`);
        fetchQueue();
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Live Queue Management</h4>
                <button onClick={handleCallNext} disabled={loading || waitingTokens.length === 0} className="btn btn-primary d-flex align-items-center gap-2">
                    <PlayCircle size={18} /> Call Next Token
                </button>
            </div>

            <div className="row">
                {/* Currently Serving Section */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0 border-top border-success border-4">
                        <div className="card-header bg-white border-bottom py-3">
                            <h6 className="mb-0 fw-bold text-success">Currently Serving (IN PROGRESS)</h6>
                        </div>
                        <div className="list-group list-group-flush">
                            {servingTokens.map(token => (
                                <div key={token.tokenNumber} className="list-group-item py-4 d-flex justify-content-between align-items-center bg-light">
                                    <div>
                                        <h2 className="mb-1 text-success fw-bold">{token.tokenNumber}</h2>
                                        <p className="mb-0 text-muted">
                                            {token.departmentName} - {token.serviceName}
                                        </p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button onClick={() => handleComplete(token.tokenNumber)} className="btn btn-success btn-lg d-flex align-items-center gap-1 shadow-sm">
                                            <CheckCircle size={20} /> Complete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {servingTokens.length === 0 && (
                                <div className="p-4 text-center text-muted">
                                    No tokens currently being served. Click "Call Next Token" to start.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Waiting List Section */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white border-bottom py-3">
                            <h6 className="mb-0 fw-bold">Waiting List</h6>
                        </div>
                        <div className="list-group list-group-flush">
                            {waitingTokens.map(token => (
                                <div key={token.tokenNumber} className="list-group-item py-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="mb-1 text-primary fw-bold">{token.tokenNumber}</h4>
                                        <p className="mb-0 text-muted small">
                                            {token.departmentName} - {token.serviceName}
                                        </p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button onClick={() => handleSkip(token.tokenNumber)} className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
                                            <XCircle size={16} /> Skip
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {waitingTokens.length === 0 && (
                                <div className="p-5 text-center text-muted">
                                    No tokens waiting in queue.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveQueue;
