import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [services, setServices] = useState([]);
    
    const [formData, setFormData] = useState({
        departmentId: '',
        serviceId: '',
        appointmentDate: '',
        appointmentTime: ''
    });

    useEffect(() => {
        api.get('/customer/departments').then(res => setDepartments(res.data));
    }, []);

    useEffect(() => {
        if (formData.departmentId) {
            api.get(`/customer/services/department/${formData.departmentId}`)
                .then(res => setServices(res.data));
        } else {
            setServices([]);
        }
    }, [formData.departmentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/customer/appointments', formData);
            alert(`Appointment booked successfully! Your Token is: ${res.data.tokenNumber}`);
            navigate('/customer');
        } catch (error) {
            alert('Failed to book appointment.');
        }
    };

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-5">
                        <h3 className="fw-bold mb-4">Book an Appointment</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-medium">Select Department</label>
                                <select className="form-select form-select-lg" required
                                    value={formData.departmentId} 
                                    onChange={e => setFormData({...formData, departmentId: e.target.value, serviceId: ''})}>
                                    <option value="">Choose...</option>
                                    {departments.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label fw-medium">Select Service</label>
                                <select className="form-select form-select-lg" required disabled={!formData.departmentId}
                                    value={formData.serviceId}
                                    onChange={e => setFormData({...formData, serviceId: e.target.value})}>
                                    <option value="">Choose...</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>{s.serviceName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-medium">Date</label>
                                    <input type="date" className="form-control form-control-lg" required
                                        min={today}
                                        value={formData.appointmentDate}
                                        onChange={e => setFormData({...formData, appointmentDate: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-medium">Time</label>
                                    <input type="time" className="form-control form-control-lg" required
                                        value={formData.appointmentTime}
                                        onChange={e => setFormData({...formData, appointmentTime: e.target.value})} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">
                                Confirm Booking & Generate Token
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
