import { useState, useEffect } from "react";
import api from "../../services/api";
import { CalendarDays, Clock, Building2, CheckCircle, XCircle, ArrowLeft, Eye, User } from "lucide-react";

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await api.get("/admin/appointments");
            setAppointments(response.data);
        } catch (error) {
            console.error("Admin appointments error", error);
            setError("Unable to load appointments");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch(status){
            case "COMPLETED":
                return <span className="badge bg-success d-flex align-items-center gap-1"><CheckCircle size={14}/> Completed</span>;
            case "CANCELLED":
                return <span className="badge bg-danger d-flex align-items-center gap-1"><XCircle size={14}/> Cancelled</span>;
            case "WAITING":
                return <span className="badge bg-warning text-dark">Waiting</span>;
            case "PENDING":
                return <span className="badge bg-secondary">Pending</span>;
            case "CONFIRMED":
                return <span className="badge bg-primary">Confirmed</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    // Group appointments by customer
    const groupedCustomers = Object.values(appointments.reduce((acc, appt) => {
        if (!acc[appt.customer]) {
            acc[appt.customer] = {
                id: appt.customer,
                name: appt.customer_name,
                appointments: []
            };
        }
        acc[appt.customer].appointments.push(appt);
        return acc;
    }, {}));

    return (
        <div>
            <div className="mb-4">
                <h4 className="fw-bold">Appointments History</h4>
                <p className="text-muted">
                    {selectedCustomer 
                        ? `Viewing history for patient: ${selectedCustomer.name}`
                        : 'Select a patient to view their appointment history'}
                </p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {selectedCustomer ? (
                <div>
                    <button 
                        className="btn btn-outline-secondary mb-4 d-flex align-items-center gap-2"
                        onClick={() => setSelectedCustomer(null)}
                    >
                        <ArrowLeft size={16} /> Back to Patients List
                    </button>

                    <div className="card shadow-sm border-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Department</th>
                                        <th>Service</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Token</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedCustomer.appointments.length > 0 ? (
                                        selectedCustomer.appointments.map((appointment) => (
                                            <tr key={appointment.id}>
                                                <td>{appointment.id}</td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Building2 size={16} className="text-muted"/>
                                                        {appointment.department_name}
                                                    </div>
                                                </td>
                                                <td>{appointment.service_name}</td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <CalendarDays size={16} className="text-muted"/>
                                                        {appointment.date}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Clock size={16} className="text-muted"/>
                                                        {appointment.time}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="fw-bold text-primary">
                                                        {appointment.token_number || "-"}
                                                    </span>
                                                </td>
                                                <td>
                                                    {getStatusBadge(appointment.status)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-5 text-muted">
                                                No appointments found for this patient
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card shadow-sm border-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Patient ID</th>
                                    <th>Patient Name</th>
                                    <th>Total Appointments</th>
                                    <th>Latest Appointment</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedCustomers.length > 0 ? (
                                    groupedCustomers.map((customer) => (
                                        <tr key={customer.id} style={{cursor: "pointer"}} onClick={() => setSelectedCustomer(customer)}>
                                            <td>#{customer.id}</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2 fw-bold text-primary">
                                                    <User size={18} />
                                                    {customer.name}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge bg-light text-dark border">
                                                    {customer.appointments.length} Appointments
                                                </span>
                                            </td>
                                            <td className="text-muted">
                                                {customer.appointments[0]?.date || "-"}
                                            </td>
                                            <td className="text-end">
                                                <button 
                                                    className="btn btn-sm btn-primary d-inline-flex align-items-center gap-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedCustomer(customer);
                                                    }}
                                                >
                                                    <Eye size={14} /> View History
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">
                                            No patients found in the system
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAppointments;
