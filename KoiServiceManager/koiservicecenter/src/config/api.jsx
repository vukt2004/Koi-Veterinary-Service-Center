import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const fetchVeterinas = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/veterinas`);
        return response.data;
    } catch (error) {
        console.error('Error fetching veterinas:', error);
    }
};

export const fetchFish = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/fish`);
        return response.data;
    } catch (error) {
        console.error('Error fetching fish:', error);
    }
};

export const fetchServices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/services`);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
    }
};

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
};

export const fetchInvoices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/invoices`);
        return response.data;
    } catch (error) {
        console.error('Error fetching invoices:', error);
    }
};

export const fetchFeedback = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/feedbacks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
    }
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    return response.json();
};

export const addOrderDescription = async (orderId, description) => {
    const response = await fetch(`http://localhost:8080/api/orders/${orderId}/description`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
    });
    return response.json();
};

