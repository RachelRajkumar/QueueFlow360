import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BookAppointment = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch departments dynamically
        const fetchDepartments = async () => {
            try {
                // In a real scenario you would fetch all active departments, mocking branch 1
                const res = await api.get('/departments/branch/1');
                setDepartments(res.data);
            } catch (err) {
                console.error("Failed to load departments", err);
            }
        };
        fetchDepartments();
    }, []);

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            await api.post('/appointments', {
                customerId: 1, // mocked user ID from token payload
                departmentId: selectedDept,
                appointmentDate: date,
                appointmentTime: time
            });
            setMessage('Appointment booked successfully!');
            setSelectedDept('');
            setDate('');
            setTime('');
        } catch (err) {
            setMessage('Failed to book appointment. Try again.');
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="card shadow-sm p-4 w-50 border-0 rounded-3">
                <h3 className="text-center fw-bold text-primary mb-4">Book an Appointment</h3>
                {message && <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                <form onSubmit={handleBooking}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Select Department</label>
                        <select className="form-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} required>
                            <option value="">Choose...</option>
                            {departments.length > 0 ? departments.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                            )) : (
                                <>
                                    <option value="1">General Services</option>
                                    <option value="2">Customer Support</option>
                                </>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Date</label>
                        <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Time</label>
                        <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
