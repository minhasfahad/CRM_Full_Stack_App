# MERN Stack CRM Dashboard

A full-stack Customer Relationship Management (CRM) application built with the MERN stack (MongoDB, Express.js, React, Node.js). The app features role-based access control, real-time state management, and a professional admin dashboard for managing customers and team members.

## 🎯 Features

- **Role-Based Access Control (RBAC)** — Three user roles with distinct permissions:
  - **Admin** — Full system access, manage all customers and users
  - **Manager** — View team customers and update project statuses
  - **Team Member** — View and manage assigned customers
  
- **Customer Management** — Create, read, update, and delete customers with detailed profiles (name, email, phone, company, status, assignments)
- **User Management** — Add and manage team members with role assignment
- **Global State Management** — React Context API for seamless data flow without page reloads
- **RESTful API** — Clean Express.js backend with MongoDB persistence
- **JWT Authentication** — Secure authentication with role-based registration (invite-code gating for elevated roles)
- **Responsive UI** — Professional dark-themed dashboard with sidebar navigation

## 🛠️ Tech Stack

**Frontend:**
- React.js (Hooks, Context API)
- Vite (fast build tool)
- CSS3 (custom styling)

**Backend:**
- Node.js
- Express.js
- MongoDB (NoSQL database)
- JWT (authentication)

**Deployment:**
- **Frontend:** Vercel
- **Backend:** Local deployment (see notes below)

## 📁 Project Structure

```
CRM_Full_Stack_App/
├── backend/
│   ├── config/              # Database and environment config
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth and request processing middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── .env                 # Environment variables (not in repo)
│   ├── index.js             # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/             # API helper functions
│   │   ├── assets/          # Images and static files
│   │   ├── components/      # Reusable React components
│   │   ├── layouts/         # Page layouts
│   │   ├── pages/           # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 📸 Screenshots

**Role Selection Page**
![Role Selection](https://your-repo-screenshots/role-selection.png)
Shows the three access levels with descriptions.

**Admin Dashboard — Customer Management**
![Admin Dashboard](https://your-repo-screenshots/admin-dashboard.png)
Add, view, and manage all customers with detailed forms.

**User List with RBAC**
![User List](https://your-repo-screenshots/user-list.png)
View all users, their roles, and manage permissions.

**Manager Panel — Customer View**
![Manager Panel](https://your-repo-screenshots/manager-panel.png)
Managers see a filtered view of team customers only.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (free tier available at [mongodb.com](https://www.mongodb.com))
- npm or yarn

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/minhasfahad/CRM_Full_Stack_App.git
   cd CRM_Full_Stack_App
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend/` folder:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
   JWT_SECRET=your_jwt_secret_key_here
   PORT=8000
   ```
   
   Replace MongoDB connection details with your Atlas credentials.

3. **Start the backend server**
   ```bash
   npm start
   ```
   The server runs on `http://localhost:8000`

4. **Set up the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```
   
   Create a `.env` file in the `frontend/` folder:
   ```
   VITE_API_URL=http://localhost:8000
   ```

5. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

### Testing the App

**Admin Login (Local):**
- Email: `admin@example.com`
- Password: `password123`

Once logged in, create additional users with different roles (Manager, Team Member) through the User Management panel.

## 📝 Notes on Deployment

**Current Status:**
- **Frontend:** Deployed on Vercel (live demo uses the no-auth build for public access)
- **Backend:** Full JWT authentication implemented; see GitHub code for the complete auth version

The live demo on Vercel (no-auth build) allows testing the UI and data flow without authentication. For the full authentication system with JWT and role-based access, refer to the GitHub repository code and run locally with the `.env` setup above.

## 🔒 Security Features

- **JWT-based Authentication** — Tokens for secure user sessions
- **Password Hashing** — Bcrypt for secure password storage
- **Role-Based Access Control** — Middleware enforces permissions on API routes
- **Invite-Code Gating** — Elevated roles (Admin, Manager) require special codes for registration
- **Environment Variables** — Secrets stored locally, never in version control

## 📚 API Endpoints (Sample)

```
POST   /api/auth/register       Register a new user
POST   /api/auth/login          User login
GET    /api/customers           Get all customers
POST   /api/customers           Create a new customer
PUT    /api/customers/:id       Update customer
DELETE /api/customers/:id       Delete customer
GET    /api/users               Get all users
POST   /api/users               Create a new user
```

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack MERN development
- JWT authentication and RBAC implementation
- RESTful API design
- MongoDB schema design
- React component architecture with Context API
- State management without external libraries
- Responsive UI design

## 📄 License

This project is open source. Feel free to use it as a reference or template for your own projects.

## 👨‍💻 Author

**Fahad Hamza Minhas**  
CS Graduate | MERN Stack Developer  
[LinkedIn](https://www.linkedin.com/in/fahad-hamza-minhas) | [GitHub](https://github.com/minhasfahad)

---

**Have questions or found a bug?** Feel free to open an issue or reach out!
