import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const UserRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match for signup
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Use the base URL from the .env file
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      // Send signup data to the backend using the correct base URL
      const response = await axios.post(`${apiUrl}/user/register`, {
        username,
        email,
        password,
      });

      alert("Registration successful! Please log in.");
      navigate("/user/login"); // Redirect to login page after successful signup
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className="title signup active">Signup Form</div>
      </div>
      <div className="form-container">
        <div className="form-inner">
          <form onSubmit={handleSignupSubmit} className="signup active">
            <div className="field">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <div className="field">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Signup" />
            </div>
            <div className="login-link">
              Already have an account?{" "}
              <button onClick={() => navigate("/user/login")}>Login now</button>
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

export default UserRegister;
