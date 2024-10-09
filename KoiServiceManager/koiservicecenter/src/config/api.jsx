import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return { error: 'Could not fetch users' };
    }
};

export const fetchVeterinas = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/veterinas`);
        return response.data;
    } catch (error) {
        console.error('Error fetching veterinas:', error);
        return { error: 'Could not fetch veterinas' };
    }
};

export const fetchFish = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/fish`);
        return response.data;
    } catch (error) {
        console.error('Error fetching fish:', error);
        return { error: 'Could not fetch fish' };
    }
};

export const fetchServices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/services`);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return { error: 'Could not fetch services' };
    }
};

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return { error: 'Could not fetch orders' };
    }
};

export const fetchInvoices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/invoices`);
        return response.data;
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return { error: 'Could not fetch invoices' };
    }
};

export const fetchFeedback = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/feedbacks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        return { error: 'Could not fetch feedbacks' };
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.put(`${BASE_URL}/orders/${orderId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        return { error: 'Could not update order status' };
    }
};

export const addOrderDescription = async (orderId, description) => {
    try {
        const response = await axios.put(`${BASE_URL}/orders/${orderId}/description`, { description });
        return response.data;
    } catch (error) {
        console.error('Error adding order description:', error);
        return { error: 'Could not add order description' };
    }
};

export const addServiceToOrder = async (orderId, serviceID, quantity) => {
    try {
        const response = await axios.post(`${BASE_URL}/orders/${orderId}/services`, { serviceID, quantity });
        return response.data;
    } catch (error) {
        console.error('Error adding service to order:', error);
        return { error: 'Could not add service to order' };
    }
};

export const removeServiceFromOrder = async (orderId, serviceID) => {
    try {
        const response = await axios.delete(`${BASE_URL}/orders/${orderId}/services/${serviceID}`);
        return response.data;
    } catch (error) {
        console.error('Error removing service from order:', error);
        return { error: 'Could not remove service from order' };
    }
};

export const updateTravelExpense = async (expenseId, fee, endLocation) => {
    try {
        const response = await axios.put(`${BASE_URL}/expenses/${expenseId}`, { fee, endLocation });
        return response.data;
    } catch (error) {
        console.error('Error updating travel expense:', error);
        return { error: 'Could not update travel expense' };
    }
};
