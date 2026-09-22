# QueueFlow 360

QueueFlow 360 is a modern, full-stack appointment and queue management system designed for clinics, hospitals, and service centers. It provides a seamless way for customers to book appointments and for administrators to manage live queues and patient histories efficiently.

## 🚀 Features

### For Customers (Patients)
* **User Authentication**: Secure signup and login functionality.
* **Book Appointments**: Easily book appointments by selecting a specific department and service.
* **Dynamic Tokens**: Receive a unique sequence token number for your booked service and date.
* **Live Queue Status**: View real-time updates on who is "Currently Serving" inside the room.
* **Appointment History**: Track past appointments, pending bookings, and cancel appointments if needed.
* **Smart Auto-Shift**: If someone cancels their appointment ahead of you, your queue token automatically shifts up!

### For Administrators
* **Dashboard Overview**: Get a bird's-eye view of total customers, today's appointments, and queue statuses.
* **Department & Service Management**: Add and manage various departments and the specific services they offer.
* **Service-wise Live Queue**: 
  * View active waiting lists separated by each service.
  * Call the "Next Token" individually for each service.
  * Track who is "Currently Inside" (Serving) and mark them as Completed or Skipped.
* **Patient History (Admin View)**: View a structured list of all registered patients, and drill down into a specific patient to see their complete appointment history across all services.

---

## 🛠️ Technology Stack

### Frontend
* **React** (via Vite) for building the user interface.
* **Bootstrap** for responsive layout and styling.
* **Lucide React** for modern, crisp icons.
* **Axios** for API communication.
* **React Router DOM** for seamless navigation.

### Backend
* **Python / Django** for the core backend logic.
* **Django REST Framework (DRF)** for building robust APIs.
* **MySQL** as the primary relational database.
* **JWT (JSON Web Tokens)** for secure authentication and authorization.

---

## ⚙️ Local Setup Instructions

### 1. Database Setup
Ensure you have MySQL installed and running. Create a database named `queueflow`:
```sql
CREATE DATABASE queueflow;
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Update database credentials in `backend/settings.py` (if necessary).
5. Apply migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Run the backend server:
   ```bash
   python manage.py runserver
   ```
   *The backend will run at `http://127.0.0.1:8000/`*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run at `http://localhost:5173/` (or similar).*

---

## 🔐 Default Credentials

To test the application locally, you can use the default admin credentials (or create a superuser):
* **Email**: `admin@queueflow.com`
* **Password**: `admin123`

*(Make sure to change these in a production environment!)*

---

## 📝 License
This project is for demonstration and educational purposes. Feel free to use and modify it as needed.
