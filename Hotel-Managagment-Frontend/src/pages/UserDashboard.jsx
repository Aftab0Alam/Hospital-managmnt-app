import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHospitals, getUserProfile } from '../services/api.jsx';
import './UserDashboard.css';

const UserDashboard = () => {
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [userName, setUserName] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/user/login');
        } else {
            fetchUserProfile();
            fetchHospitals();
        }
    }, [navigate]);

    const fetchHospitals = async () => {
        try {
            const response = await getHospitals();
            setHospitals(response.hospitals);
            setFilteredHospitals(response.hospitals);
        } catch (err) {
            alert('Failed to fetch hospitals. Please try again.');
        }
    };

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await getUserProfile(token);
            setUserName(response.username);
        } catch (err) {
            alert('Failed to fetch user profile.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchCity(e.target.value);
    };

    const handleSearchClick = () => {
        if (searchCity) {
            const filtered = hospitals.filter((hospital) =>
                hospital.city.toLowerCase().includes(searchCity.toLowerCase())
            );
            setFilteredHospitals(filtered);
        } else {
            setFilteredHospitals(hospitals);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/user/login');
    };

    return (
        <div className="user-dashboard">
            <nav className="navbar">
                <div className="navbar-left">
                    <span>{userName}</span>
                </div>
                <div className="navbar-right">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by city"
                            value={searchCity}
                            onChange={handleSearchChange}
                            className="search-bar"
                        />
                        <button onClick={handleSearchClick} className="search-button">Search</button>
                    </div>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </nav>

            <h2 className="welcome-text">Welcome to Hospital Management</h2>

            <div className="hospital-list-section">
                <h3>Hospitals</h3>
                {filteredHospitals.length === 0 ? (
                    <p>No hospitals found.</p>
                ) : (
                    <div className="hospital-grid">
                        {filteredHospitals.map((hospital) => (
                            <div key={hospital._id} className="hospital-card">
                                {hospital.image && (
                                    <img
                                        src={hospital.image}
                                        alt={hospital.name}
                                        className="hospital-image"
                                    />
                                )}
                                <h4>{hospital.name}</h4>
                                <p><strong>City:</strong> {hospital.city}</p>
                                <p><strong>Specialties:</strong> {hospital.specialties}</p>
                                <p><strong>Contact:</strong> {hospital.contact_number}</p>
                                {hospital.ratings && (
                                    <p><strong>Ratings:</strong> {hospital.ratings} ★</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
