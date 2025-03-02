import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHospitals, createHospital, updateHospital, deleteHospital } from '../services/api.jsx';
import './AdminDashboard.css'

const AdminDashboard = () => {
    const [hospitals, setHospitals] = useState([]);
    const [newHospital, setNewHospital] = useState({ name: '', city: '', specialties: '', contact_number: '', ratings: '', image: '' });
    const [editHospital, setEditHospital] = useState({
        name: '',
        city: '',
        specialties: '',
        contact_number: '',
        ratings: '', 
      });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
        }
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        try {
            const response = await getHospitals();
            setHospitals(response.hospitals);
        } catch (err) {
            alert('Failed to fetch hospitals. Please try again.');
        }
    };

    const handleCreateHospital = async (e) => {
        e.preventDefault();

        try {
            await createHospital(newHospital);
            setNewHospital({ name: '', city: '', specialties: '', contact_number: '', ratings: '', image: '' });
            fetchHospitals();
        } catch (err) {
            alert('Failed to create hospital. Please try again.');
        }
    };

    const handleUpdateHospital = async (e) => {
        e.preventDefault();
        try {
            await updateHospital(editHospital._id, editHospital);
            alert('Hospital updated successfully!');
            setEditHospital(null);
            fetchHospitals();
        } catch (err) {
            alert('Failed to update hospital. Please try again.');
        }
    };

    const handleDeleteHospital = async (id) => {
        try {
            await deleteHospital(id);
            fetchHospitals();
            alert("Deleted");
        } catch (err) {
            alert('Failed to delete hospital. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard">
            <nav className="navbar">
                <h2>Admin Dashboard</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            <div className="form-section">
                <h3>Create New Hospital</h3>
                <form onSubmit={handleCreateHospital}>
                    <input type="text" placeholder="Name" value={newHospital.name} onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })} required />
                    <input type="text" placeholder="City" value={newHospital.city} onChange={(e) => setNewHospital({ ...newHospital, city: e.target.value })} required />
                    <input type="text" placeholder="Specialties" value={newHospital.specialties} onChange={(e) => setNewHospital({ ...newHospital, specialties: e.target.value })} required />
                    <input type="text" placeholder="Contact Number" value={newHospital.contact_number} onChange={(e) => setNewHospital({ ...newHospital, contact_number: e.target.value })} required />
                    <input type="number" placeholder="Ratings (0-5)" value={newHospital.ratings} onChange={(e) => setNewHospital({ ...newHospital, ratings: e.target.value })} required min="0" max="5" />
                    <input type="text" placeholder="Image URL" value={newHospital.image} onChange={(e) => setNewHospital({ ...newHospital, image: e.target.value })} required />
                    <button type="submit">Create Hospital</button>
                </form>
            </div>

            <div className="hospital-list-section">
                <h3>Hospitals</h3>
                {hospitals.length === 0 ? (
                    <p>No hospitals found.</p>
                ) : (
                    <ul className="hospital-list">
                        {hospitals.map((hospital) => (
                            <li key={hospital._id} className="hospital-item">
                                {hospital.image && <img src={hospital.image} alt={hospital.name} style={{ width: '100px', height: '100px', display: 'block', marginBottom: '10px' }} />}
                                <div>
                                    <strong>{hospital.name}</strong> - {hospital.city}
                                    <p>Specialties: {hospital.specialties}</p>
                                    <p>Contact: {hospital.contact_number}</p>
                                    <p>Ratings: {hospital.ratings} ★</p>
                                </div>
                                <div className="action-buttons">
                                    <button onClick={() => setEditHospital(hospital)}>Edit</button>
                                    <button onClick={() => handleDeleteHospital(hospital._id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {editHospital && (
                <div className="form-section">
                    <h3>Edit Hospital</h3>
                    <form onSubmit={handleUpdateHospital}>
                        <input type="text" placeholder="Name" value={editHospital.name} onChange={(e) => setEditHospital({ ...editHospital, name: e.target.value })} required />
                        <input type="text" placeholder="City" value={editHospital.city} onChange={(e) => setEditHospital({ ...editHospital, city: e.target.value })} required />
                        <input type="text" placeholder="Specialties" value={editHospital.specialties} onChange={(e) => setEditHospital({ ...editHospital, specialties: e.target.value })} required />
                        <input type="text" placeholder="Contact Number" value={editHospital.contact_number} onChange={(e) => setEditHospital({ ...editHospital, contact_number: e.target.value })} required />
                        <input type="number" placeholder="Ratings (0-5)" value={editHospital.ratings} onChange={(e) => setEditHospital({ ...editHospital, ratings: e.target.value })} required min="0" max="5" />
                        <input type="text" placeholder="Image URL" value={editHospital.image} onChange={(e) => setEditHospital({ ...editHospital, image: e.target.value })} required />
                        <button type="submit">Update Hospital</button>
                        <button type="button" onClick={() => setEditHospital(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
