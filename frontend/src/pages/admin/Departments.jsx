import { useState, useEffect } from 'react';
import api from '../../services/api';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const res = await api.get('/admin/departments');
        setDepartments(res.data);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        await api.post('/admin/departments', { name, description });
        setName('');
        setDescription('');
        fetchDepartments();
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure?')) {
            await api.delete(`/admin/departments/${id}`);
            fetchDepartments();
        }
    };

    return (
        <div>
            <h4 className="mb-4 fw-bold">Manage Departments</h4>
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleCreate} className="d-flex gap-3 align-items-end">
                        <div className="flex-grow-1">
                            <label className="form-label">Department Name</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="flex-grow-1">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Department</button>
                    </form>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map(d => (
                                <tr key={d.id}>
                                    <td>{d.id}</td>
                                    <td className="fw-medium">{d.name}</td>
                                    <td className="text-muted">{d.description}</td>
                                    <td>
                                        <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {departments.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-muted">No departments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Departments;
