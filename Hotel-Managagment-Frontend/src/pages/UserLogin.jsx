import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSignup.css"; // Make sure the CSS is imported

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await axios.post(`${apiUrl}/user/login`, {
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      alert('Login successful! Redirecting to your dashboard...');

      // Redirect to the user dashboard
      navigate("/user/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className="title login active">Login Form</div>
      </div>
      <div className="form-container">
        <div className="form-inner">
          <form onSubmit={handleSubmit} className="login active">
            <div className="field">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Don't have an account?{" "}
              <button onClick={() => navigate("/user/register")}>Register now</button>
            </div>
            <div>
                Are you an admin?{" "}
                <button onClick={() => navigate("/admin/login")}>Admin Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
