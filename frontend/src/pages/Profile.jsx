import React, { useState } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900'
    });

    const handleSave = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    return (
        <div className="container py-5">
            <div className="card shadow-sm border-0 w-50 mx-auto">
                <div className="card-header bg-primary text-white border-0 py-3">
                    <h5 className="mb-0 fw-bold">My Profile</h5>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSave}>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label fw-semibold">First Name</label>
                                <input type="text" className="form-control" value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})} />
                            </div>
                            <div className="col">
                                <label className="form-label fw-semibold">Last Name</label>
                                <input type="text" className="form-control" value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email</label>
                            <input type="email" className="form-control" value={profile.email} disabled />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Phone Number</label>
                            <input type="text" className="form-control" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                        </div>
                        <button type="submit" className="btn btn-success fw-bold w-100">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
