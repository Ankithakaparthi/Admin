# 📊 Admin Dashboard

A full-stack **Admin Dashboard** application built using **Angular (Frontend)** and **Express + MongoDB (Backend)**.  
This system allows administrators to monitor orders, track sales analytics, and manage platform data efficiently.

---

## 🚀 Features

### 📦 Order & Sales Management
- View all orders
- Calculate total revenue
- Track product sales
- View last 7 days sales analytics

### 📈 Analytics Dashboard
- Products sold per day visualization
- Sales amount trends
- Chart-based analytics using Chart.js

### 🔐 Authentication
- Admin login system
- JWT-based authentication
- Protected backend routes

---

## 🏗️ Project Architecture

```
admin-dashboard
 ┣ frontend   → Angular UI
 ┣ backend    → Express API + MongoDB
 ┗ .gitignore
```

---

## 🛠️ Tech Stack

### Frontend
- Angular
- Tailwind CSS
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- dotenv

---

# ⚙️ Local Setup Guide

---

## 📌 Prerequisites

Make sure the following are installed:

- Node.js (v18 or higher recommended)
- npm
- MongoDB (Local or Cloud Atlas)
- Angular CLI

Install Angular CLI globally if not installed:

```bash
npm install -g @angular/cli
```

---

# 🖥️ Backend Setup (Express + MongoDB)

---

## 📂 Navigate to Backend Folder

```bash
cd backend
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

### Example `.env`

```
MONGO_URI=mongodb://127.0.0.1:27017/mydb
JWT_SECRET=yourSecretKey
```

---

## ▶️ Run Backend Server

```bash
npm start
```

Server will run at:

```
http://localhost:3001
```

---

# 🎨 Frontend Setup (Angular)

---

## 📂 Navigate to Frontend Folder

```bash
cd frontend
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ▶️ Run Angular Application

```bash
ng serve
```

Frontend will run at:

```
http://localhost:4200
```

---

# 🔗 API Integration

Make sure backend is running before launching frontend.

Backend API Base URL:

```
http://localhost:3001
```

---

# 📊 Charts Implementation

Charts are implemented using **Chart.js**.

No additional Angular chart libraries are required.

---

# 🔑 Authentication Flow

1. Admin logs in
2. Backend generates JWT token
3. Token stored in LocalStorage
4. Token sent with API requests
5. Backend verifies token for protected routes

---

# 📁 Important Project Structure

### Backend

```
backend
 ┣ controllers
 ┣ models
 ┣ routes
 ┣ .env
 ┗ app.js
```

---

### Frontend

```
frontend
 ┣ src/app/components
```

---

# 🧪 Testing the Project

1. Start MongoDB
2. Run backend server
3. Run Angular frontend
4. Create an account and manually update isAdmin = true in MongoDBCompass
5. Login using admin credentials
6. Navigate to dashboard to view analytics

---

# 🛡️ Security Notes

- `.env` is ignored from git
- JWT used for authentication
- Sensitive configs stored in environment variables

---

---

### Backend Deployment

Set environment variables on hosting platform and run:

```bash
npm start
```