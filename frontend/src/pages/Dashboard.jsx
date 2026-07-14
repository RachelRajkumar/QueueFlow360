import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Mock customer ID for now, in a real app this comes from the decoded JWT
        const customerId = 1; 
        
        const fetchAppointments = async () => {
            try {
                const res = await api.get(`/appointments/customer/${customerId}`);
                setAppointments(res.data);
            } catch (err) {
                console.error("Failed to fetch appointments", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">Customer Dashboard</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 text-white bg-primary h-100">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 className="card-title">Book Appointment</h5>
                            <button className="btn btn-light mt-3 fw-bold">Book Now</button>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 text-white bg-success h-100">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 className="card-title">Join a Queue</h5>
                            <button className="btn btn-light mt-3 fw-bold">Generate Token</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 bg-light h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title text-muted">My Profile</h5>
                            <button className="btn btn-outline-secondary mt-3">View Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="mt-4 mb-3">My Upcoming Appointments</h4>
            {loading ? (
                <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
            ) : appointments.length > 0 ? (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Department</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt) => (
                                <tr key={appt.id}>
                                    <td className="fw-semibold">{appt.departmentName}</td>
                                    <td>{appt.appointmentDate}</td>
                                    <td>{appt.appointmentTime}</td>
                                    <td>
                                        <span className={`badge ${appt.status === 'SCHEDULED' ? 'bg-primary' : 'bg-secondary'}`}>
                                            {appt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-info">You have no upcoming appointments.</div>
            )}
        </div>
    );
};

export default Dashboard;
