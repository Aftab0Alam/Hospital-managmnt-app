import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api.jsx';
import './Admin.css';
const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await adminLogin(username, password);
            localStorage.setItem('token', response.token); // Store token
            navigate('/admin/dashboard'); // Redirect to admin dashboard
        } catch (err) {
            alert(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
                    <div className="title login active">Admin Panel</div>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default AdminLogin;