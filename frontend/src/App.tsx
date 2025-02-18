// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardProjects from "./pages/DashboardProjects";
import DashboardChat from "./pages/DashboardChat";
import DashboardTasks from "./pages/DashboardTasks";
import DashboardVideoCalls from "./pages/DashboardVideoCalls";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Dashboard default page (Overview) */}
            <Route index element={<DashboardOverview />} />
            {/* Nested Dashboard routes */}
            <Route path="projects" element={<DashboardProjects />} />
            <Route path="chat" element={<DashboardChat />} />
            <Route path="tasks" element={<DashboardTasks />} />
            <Route path="video" element={<DashboardVideoCalls />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
