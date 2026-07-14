import React from 'react';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white text-center">
            <div className="container">
                <span>&copy; {new Date().getFullYear()} QueueFlow 360. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
