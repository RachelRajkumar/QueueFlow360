import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Settings = () => {
    const [theme, setTheme] = useState('light');
    const [companyName, setCompanyName] = useState('QueueFlow 360 Corp.');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const res = await api.get('/settings');
                // Assuming settings array is returned and we extract the company_name
                const companySetting = res.data.find(s => s.settingKey === 'company_name');
                if (companySetting) setCompanyName(companySetting.settingValue);
            } catch (err) {
                console.error("Failed to load settings", err);
            }
        };
        loadSettings();
    }, []);

    const handleSave = async () => {
        try {
            await api.put('/settings', {
                settingKey: 'company_name',
                settingValue: companyName
            });
            setMessage('Settings saved successfully!');
        } catch (err) {
            setMessage('Failed to save settings.');
        }
    };
    
    return (
        <div className="container py-5">
            <h2 className="text-primary fw-bold mb-4">System Settings</h2>
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    {message && <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                    <h5 className="fw-bold mb-4">Application Preferences</h5>
                    
                    <div className="mb-4 d-flex align-items-center justify-content-between">
                        <div>
                            <h6 className="mb-1 fw-semibold">Dark Mode</h6>
                            <p className="text-muted mb-0 small">Switch between light and dark themes</p>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" checked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ transform: 'scale(1.5)' }} />
                        </div>
                    </div>

                    <hr className="my-4"/>

                    <h5 className="fw-bold mb-4">Company Details</h5>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Company Name</label>
                        <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Support Email</label>
                        <input type="email" className="form-control" defaultValue="support@queueflow.com" />
                    </div>
                    
                    <button className="btn btn-primary fw-bold px-4" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
