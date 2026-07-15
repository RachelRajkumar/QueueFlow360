-- Create Database
CREATE DATABASE IF NOT EXISTS queueflow360;
USE queueflow360;

-- Sample Data for Departments and Services (Wait until tables are created by Hibernate, or create them manually here)
-- Since we use spring.jpa.hibernate.ddl-auto=update, tables are created automatically by Spring Boot on startup.
-- This script provides initial sample data. Ensure you run this AFTER running the Spring Boot application once.

-- 1. Insert Default Admin User (Password is 'admin123' bcrypt hashed)
INSERT INTO users (name, email, password, role) 
VALUES ('System Admin', 'admin@queueflow360.com', '$2a$10$wYx1D6mP1.Wk9/1Qy8S5MOn.X.6G8/2Q8x4Lh4RzP6vQ5j8Z9.BqO', 'ROLE_ADMIN')
ON DUPLICATE KEY UPDATE email=email;

-- 2. Insert Departments
INSERT INTO departments (name, description) VALUES 
('Customer Support', 'Handles general inquiries and issues'),
('Technical Support', 'Handles complex technical problems'),
('Billing', 'Handles payments and invoices'),
('Sales', 'Handles new purchases and inquiries');

-- 3. Insert Services
-- Assuming department IDs are 1 (Customer Support), 2 (Tech Support), 3 (Billing), 4 (Sales)
INSERT INTO services (department_id, service_name) VALUES 
(1, 'General Inquiry'),
(1, 'Complaint'),
(2, 'Internet Issue'),
(2, 'Hardware Repair'),
(3, 'Pay Bill'),
(3, 'Invoice Dispute'),
(4, 'New Connection'),
(4, 'Upgrade Plan');
