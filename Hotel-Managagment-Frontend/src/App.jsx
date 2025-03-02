import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserRegister from './pages/UserRegister';

function App() {
    return (
        <Router>
            <Routes>
                {/* User Routes */}
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/dashboard" element={<UserDashboard />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Default Route (Redirect to User Login) */}
                <Route path="/" element={<UserLogin />} />
            </Routes>
        </Router>
    );
}

export default App;