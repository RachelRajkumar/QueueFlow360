import { useState, useEffect } from 'react';
import api from '../../services/api';

const Services = () => {
    const [services, setServices] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    useEffect(() => {
        fetchServices();
        fetchDepartments();
    }, []);

    const fetchServices = async () => {
        const res = await api.get('/admin/services');
        setServices(res.data);
    };

    const fetchDepartments = async () => {
        const res = await api.get('/admin/departments');
        setDepartments(res.data);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        await api.post('/admin/services', { 
            serviceName, 
            department: { id: departmentId } 
        });
        setServiceName('');
        setDepartmentId('');
        fetchServices();
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure?')) {
            await api.delete(`/admin/services/${id}`);
            fetchServices();
        }
    };

    return (
        <div>
            <h4 className="mb-4 fw-bold">Manage Services</h4>
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleCreate} className="d-flex gap-3 align-items-end">
                        <div className="flex-grow-1">
                            <label className="form-label">Service Name</label>
                            <input type="text" className="form-control" value={serviceName} onChange={e => setServiceName(e.target.value)} required />
                        </div>
                        <div className="flex-grow-1">
                            <label className="form-label">Department</label>
                            <select className="form-select" value={departmentId} onChange={e => setDepartmentId(e.target.value)} required>
                                <option value="">Select Department</option>
                                {departments.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Service</button>
                    </form>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Service Name</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(s => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td className="fw-medium">{s.serviceName}</td>
                                    <td className="text-muted">{s.department?.name}</td>
                                    <td>
                                        <button onClick={() => handleDelete(s.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {services.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-muted">No services found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Services;
