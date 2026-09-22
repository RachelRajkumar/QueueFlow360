import { useState, useEffect } from "react";
import api from "../../services/api";
import { PlayCircle, CheckCircle, XCircle, RefreshCcw } from "lucide-react";

const LiveQueue = () => {
    const [waitingTokens, setWaitingTokens] = useState([]);
    const [servingTokens, setServingTokens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchQueue();
        const interval = setInterval(() => {
            fetchQueue();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchQueue = async () => {
        try {
            const [waitingRes, servingRes] = await Promise.all([
                api.get("/queue/waiting"),
                api.get("/queue/serving")
            ]);
            setWaitingTokens(waitingRes.data);
            setServingTokens(servingRes.data);
            setError("");
        } catch (error) {
            console.log(error);
            setError("Unable to load queue");
        }
    };

    const handleCallNext = async (serviceId) => {
        try {
            setLoading(true);
            await api.post("/queue/call-next", { service_id: serviceId });
            fetchQueue();
        } catch (error) {
            alert("Unable to call next token");
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (tokenNumber) => {
        try {
            setActionLoading(tokenNumber);
            await api.post(`/queue/complete/${tokenNumber}`);
            fetchQueue();
        } finally {
            setActionLoading("");
        }
    };

    const handleSkip = async (tokenNumber) => {
        try {
            setActionLoading(tokenNumber);
            await api.post(`/queue/skip/${tokenNumber}`);
            fetchQueue();
        } finally {
            setActionLoading("");
        }
    };

    const activeServicesMap = new Map();
    [...servingTokens, ...waitingTokens].forEach(t => {
        activeServicesMap.set(t.service, {
            id: t.service,
            name: t.service_name,
            department_name: t.department_name
        });
    });
    const activeServices = Array.from(activeServicesMap.values());

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Live Queue Management</h4>
                    <small className="text-muted">Auto refresh every 5 seconds</small>
                </div>
                <button onClick={fetchQueue} className="btn btn-outline-secondary btn-sm d-flex gap-2 align-items-center">
                    <RefreshCcw size={16} /> Refresh
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {activeServices.length === 0 ? (
                <div className="card shadow-sm border-0 p-5 text-center text-muted">
                    No active queues at the moment.
                </div>
            ) : (
                activeServices.map(service => {
                    const serviceWaiting = waitingTokens.filter(t => t.service === service.id);
                    const serviceServing = servingTokens.filter(t => t.service === service.id);

                    return (
                        <div key={service.id} className="card shadow-sm border-0 mb-4">
                            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                                <h5 className="fw-bold mb-0 text-primary">
                                    {service.department_name} - {service.name}
                                </h5>
                                <button
                                    onClick={() => handleCallNext(service.id)}
                                    disabled={loading || serviceWaiting.length === 0}
                                    className="btn btn-primary btn-sm d-flex gap-1 align-items-center"
                                >
                                    <PlayCircle size={16} /> Call Next
                                </button>
                            </div>
                            <div className="card-body">
                                {serviceServing.length > 0 && (
                                    <div className="alert alert-success d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <span className="badge bg-success me-2">Currently Inside</span>
                                            <strong className="fs-5 me-2">Token: {serviceServing[0].sequential_token}</strong> 
                                            <span>({serviceServing[0].customer_name})</span>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button
                                                onClick={() => handleComplete(serviceServing[0].token_number)}
                                                disabled={actionLoading === serviceServing[0].token_number}
                                                className="btn btn-success btn-sm d-flex gap-1 align-items-center"
                                            >
                                                <CheckCircle size={16} /> Complete
                                            </button>
                                            <button
                                                onClick={() => handleSkip(serviceServing[0].token_number)}
                                                disabled={actionLoading === serviceServing[0].token_number}
                                                className="btn btn-outline-danger btn-sm d-flex gap-1 align-items-center"
                                            >
                                                <XCircle size={16} /> Skip
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <h6 className="fw-bold mb-3">Waiting ({serviceWaiting.length})</h6>
                                <div className="list-group list-group-flush border rounded">
                                    {serviceWaiting.length > 0 ? serviceWaiting.map(token => (
                                        <div key={token.token_number} className="list-group-item p-3 d-flex justify-content-between align-items-center bg-light">
                                            <div>
                                                <h5 className="text-primary fw-bold mb-1">
                                                    Token: {token.sequential_token}
                                                </h5>
                                                <h6 className="mb-0">{token.customer_name}</h6>
                                            </div>
                                            <div className="text-end text-muted small">
                                                <div><strong>Date:</strong> {token.appointment_date}</div>
                                                <div><strong>Time:</strong> {token.appointment_time}</div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="list-group-item p-4 text-center text-muted">
                                            No tokens waiting for this service.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default LiveQueue;