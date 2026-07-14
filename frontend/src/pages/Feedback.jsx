import React, { useState } from 'react';
import api from '../services/api';

const Feedback = () => {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/feedback', {
                customerId: 1, // mocked user ID from token payload
                rating: parseInt(rating),
                comments: review
            });
            setMessage('Thank you for your feedback!');
            setRating(5);
            setReview('');
        } catch (err) {
            setMessage('Failed to submit feedback.');
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="card shadow-sm p-4 w-50 border-0 rounded-3">
                <h3 className="text-center fw-bold text-primary mb-4">Service Feedback</h3>
                {message && <div className={`alert ${message.includes('Thank you') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-center">
                        <label className="form-label fw-semibold">Rate your experience</label>
                        <input type="range" className="form-range" min="1" max="5" step="1" value={rating} onChange={(e) => setRating(e.target.value)} />
                        <h4 className="text-warning mt-2">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</h4>
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Your Review</label>
                        <textarea className="form-control" rows="4" placeholder="Tell us how we did..." value={review} onChange={(e) => setReview(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold">Submit Feedback</button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
