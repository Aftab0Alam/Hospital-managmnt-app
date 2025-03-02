import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// User login
export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/login`, {
            email,
            password,
        });
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
};

export const userRegister = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/register`, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
};

// Admin login
export const adminLogin = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/login`, {
            username,
            password,
        });
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
};

// Get hospitals by city
export const getHospitalsByCity = async (city) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/hospitals`, {
            params: { city },
        });
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
};

// Fetch user profile
export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
};

// Fetch all hospitals
export const getHospitals = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/hospitals`);
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
};

// Create a new hospital
export const createHospital = async (hospitalData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/hospitals/create`, hospitalData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
};

// Update a hospital
export const updateHospital = async (id, hospitalData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/hospitals/update`, { id, ...hospitalData }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
};



// Delete a hospital
export const deleteHospital = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/hospitals/delete`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is included
            },
            data: { id },  // Send the ID in the body of the request
        });
        return response.data;
    } catch (err) {
        console.error("Delete failed:", err);
        throw err.response ? err.response.data : err;
    }
};

