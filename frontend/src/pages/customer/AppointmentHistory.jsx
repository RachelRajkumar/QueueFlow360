import { useState, useEffect } from 'react';
import api from '../../services/api';

const AppointmentHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get('/customer/appointments');
            setAppointments(res.data);
        } catch (error) {
            console.error('Error fetching appointments', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if(window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                await api.delete(`/customer/appointments/${id}`);
                fetchAppointments();
            } catch (error) {
                alert('Failed to cancel appointment');
            }
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div>
            <h3 className="fw-bold mb-4">Appointment History</h3>
            
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="py-3">Date & Time</th>
                                <th>Department</th>
                                <th>Service</th>
                                <th>Token Number</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(app => (
                                <tr key={app.id}>
                                    <td className="py-3">
                                        <div className="fw-medium">{app.appointmentDate}</div>
                                        <div className="text-muted small">{app.appointmentTime}</div>
                                    </td>
                                    <td>{app.departmentName}</td>
                                    <td>{app.serviceName}</td>
                                    <td>
                                        <span className="badge bg-secondary">
                                            {app.tokenNumber || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${app.status === 'SCHEDULED' ? 'bg-primary' : (app.status === 'CANCELLED' ? 'bg-danger' : 'bg-success')}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>
                                        {app.status === 'SCHEDULED' && (
                                            <button onClick={() => handleCancel(app.id)} className="btn btn-sm btn-outline-danger">
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {appointments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted">
                                        You have no appointment history.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AppointmentHistory;
