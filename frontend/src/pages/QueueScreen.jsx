import React, { useEffect, useState } from 'react';
import api from '../services/api';

const QueueScreen = () => {
    const [queues, setQueues] = useState([]);

    useEffect(() => {
        const fetchLiveQueues = async () => {
            try {
                // Fetch live queues for a specific branch/department. Mocking dept 1
                const res = await api.get('/queues/department/1');
                setQueues(res.data);
            } catch (err) {
                console.error("Failed to fetch live queues", err);
            }
        };

        fetchLiveQueues();
        // Poll every 10 seconds
        const interval = setInterval(fetchLiveQueues, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-fluid bg-dark min-vh-100 d-flex flex-column justify-content-center p-5 text-white">
            <h1 className="text-center display-4 fw-bold mb-5 text-warning">NOW SERVING</h1>
            <div className="row g-4">
                {queues.length > 0 ? queues.slice(0, 4).map((q, index) => (
                    <div className="col-md-6" key={q.id}>
                        <div className="card bg-secondary border-0 text-center h-100 py-5 shadow-lg">
                            <h3 className="text-light mb-4">Counter {index + 1}</h3>
                            <h1 className="display-1 fw-bold text-white">{q.queueNumber}</h1>
                        </div>
                    </div>
                )) : (
                    <div className="col-12 text-center">
                        <h2 className="text-muted">No active queues at the moment.</h2>
                    </div>
                )}
            </div>
            
            <div className="mt-5 text-center">
                <h4 className="text-muted">Please proceed to the respective counter when your number is displayed.</h4>
            </div>
        </div>
    );
};

export default QueueScreen;
