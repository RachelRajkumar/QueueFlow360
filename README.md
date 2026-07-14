# QueueFlow 360
Smart Queue, Appointment & Customer Service Management Platform

## Architecture Overview
QueueFlow 360 is an industry-level SaaS application built with a modern Full-Stack Architecture:
- **Backend:** Java 21, Spring Boot 3, Spring Data JPA, Spring Security (JWT), MySQL.
- **Frontend:** React.js, Vite, React Router, Axios, Bootstrap 5.

## Modules Completed
1. Authentication (JWT, Roles)
2. Admin Dashboard UI
3. Customer Dashboard UI
4. Queue Management API
5. Appointment Management API
6. Branch Management API
7. Department Management API
8. Employee Management API
9. Counter Management API
10. Token Management API
11. Notification Module API
12. Feedback Module API
13. Settings Module API
14. Search API
15. Reporting API

## Getting Started

### 🚀 The Easiest Way: Docker (Recommended)
You can run the entire platform (MySQL, Spring Boot Backend, React Frontend) with a single command:
```bash
docker-compose up --build
```
The Frontend will be available at `http://localhost:80`
The Backend APIs will be available at `http://localhost:8080`
Interactive API Docs (Swagger) will be at `http://localhost:8080/swagger-ui.html`

### Manual Setup

#### Prerequisites
- JDK 21
- Maven
- Node.js (v18+)
- MySQL Server

#### 1. Database Setup
Ensure MySQL is running locally on port 3306.
Create a database named `queueflow360`:
```sql
CREATE DATABASE queueflow360;
```

#### 2. Run Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
The backend API will start on `http://localhost:8080/api/v1`.

#### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The React frontend will start on `http://localhost:5173`.

## Deployment & CI/CD
- **Docker:** Fully dockerized via `docker-compose.yml`.
- **CI/CD:** Configured with GitHub Actions (`.github/workflows/ci.yml`) to automatically build and test both frontend and backend on every push.
- **API Docs:** Integrated `springdoc-openapi` for Swagger documentation.
