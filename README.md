# TaskTogether 🏗️🚀  

## **TaskTogether**
TaskTogether is a **remote team collaboration** platform designed to streamline project management, team communication, and real-time video conferencing. Built with a robust **backend (Node.js, Express, PostgreSQL, Prisma)** and a dynamic **frontend (React, TypeScript)**, it empowers teams to work efficiently from anywhere.

---

## 🌟 Features  
✔ **Project Management** – Create, update, and manage projects  
✔ **Task Assignment** – Assign tasks, update status (Kanban-style)  
✔ **Real-time Chat** – Send and receive messages instantly  
✔ **Video Calls** – Start secure video meetings within the app  
✔ **Authentication** – Secure user login with JWT  
✔ **Role-based Access** – Admin/member permissions for projects  

---

## 🚀 Tech Stack  

### **Frontend:**  
- React.js (TypeScript)  
- Bootstrap for UI  
- WebSockets for real-time chat  
- React Router for navigation  

### **Backend:**  
- Node.js (Express.js)  
- PostgreSQL (Prisma ORM)  
- Socket.io (for real-time communication)  
- JWT authentication  
- DigitalOcean App Platform for deployment  

---

## 🔧 Installation & Setup  

### **1. Clone the repository**
```bash
 git clone https://github.com/AndreLiar/TaskTogether.git
 cd TaskTogether
```

### **2. Backend Setup**
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the database URL as needed:
     ```
     DATABASE_URL=postgresql://your_user:your_password@localhost:5432/remote_collab
     ```
3. Run migrations and seed the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### **3. Frontend Setup**
1. Install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
2. Start the frontend server:
   ```bash
   npm start
   ```

---

## 🗄️ Database Setup & Restoration

A database dump (`remote_collab_backup.dump`) is available in the **backend** folder. Follow these steps to restore it on your machine:

### **1. Create a New PostgreSQL Database**
Ensure PostgreSQL is installed, then create a database:
```bash
createdb -U your_user -h localhost -p 5432 remote_collab
```

### **2. Restore the Database**
```bash
pg_restore -U your_user -h localhost -p 5432 -d remote_collab -C -F c backend/remote_collab_backup.dump
```

### **3. Update Environment Variables**
Edit the `.env` file in the `backend` folder with your database credentials:
```env
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/remote_collab
```

---

## 🎯 Roadmap  
✅ MVP (Minimum Viable Product) Ready  
📌 Improve UI/UX for chat & video calls  

---

## 💡 Contributing  
We welcome contributions! Feel free to **fork** the repo, create a branch, and submit a PR.  

```bash
git checkout -b feature-new
git commit -m "Added new feature"
git push origin feature-new
```

---

## 📄 License  
This project is licensed under the **MIT License**.

---

## 📧 Contact  
💬 **Developed by:** Andre Yvan Laurel Kanmegne Tabouguie  
📌 **GitHub:** [AndreLiar](https://github.com/AndreLiar)  
📌 **Email:** andrelaurelyvan.kanmegnetabouguie@ynov.com  
  
🚀 **Let's build something amazing together!** 🚀  

---

