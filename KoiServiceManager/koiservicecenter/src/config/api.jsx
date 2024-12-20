﻿/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';

const BASE_URL = 'https://localhost:8080/api';

const getAuthHeaders = () => {
    const token = sessionStorage.getItem('user'); // Fetch the token from sessionStorage

    return {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json', // Optional: Set content type if needed
        },
    };
};

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const fetchUserID = async (userID) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/Id/${userID}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const fetchFish = async (userID) => {
    try {
        const response = await axios.get(`${BASE_URL}/fish/${userID}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const addFish = async (fishData) => {
    try {
        const response = await axios.post(`${BASE_URL}/fish`, fishData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error adding fish:', error);
        return null;
    }
};

export const updateFish = async (fishId, fishData) => {
    try {
        const response = await axios.put(`${BASE_URL}/fish/${fishId}`, fishData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error updating fish:', error);
        return null;
    }
};

export const getFeedbackByVeterinaId = async (veterinaID) => {
    try {
        const response = await axios.get(`${BASE_URL}/feedbacks/${veterinaID}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('fetchFeedback:', error);
        return null;
    }
}

export const deleteFish = async (fishId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/fish/${fishId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error deleting fish:', error);
        return null;
    }
};

export const fetchSlots = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/slots`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching slots:', error);
        return null;
    }
};

export const fetchVeterinas = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/veterinas`);
        return response.data;
    } catch (error) {
        console.error('Error fetching veterinas:', error);
        return null;
    }
};

export const createVeterina = async (vetedata) => {
    try {
        const response = await axios.post(`${BASE_URL}/veterina/add`, vetedata, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching veterinas:', error);
        return null;
    }
};

export const fetchServices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/services`);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return null;
    }
};

export const fetchTravelExpense = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/expenses`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return null;
    }
};

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/orders`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
};

export const initiatePayment = async (orderId, status) => {
    try {
        const response = await axios.post(`${BASE_URL}/payment/${orderId}/${status}`, {}, getAuthHeaders());
        const paymentUrl = response.data.body;
        return paymentUrl;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchOrdersByVeterina = async (veterinaID) => {
    try {
        const response = await axios.get(`${BASE_URL}/orders/veterina/${veterinaID}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
};

export const fetchOrdersByUser = async (userID) => {
    try {
        const response = await axios.get(`${BASE_URL}/orders/user/${userID}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    } 
};

export const fetchInvoiceByOrderId = async (orderId) => {
    try {
        const response = await axios.get(`${BASE_URL}/invoices/orders/${orderId}`, getAuthHeaders());
        return response.data;
    } catch (e) {
        console.error(e);
        return null; 
    }
};

export const createFeedBack = async ({ comment, rating, orderId }) => {
    try {
        const response = await axios.post(`${BASE_URL}/feedbacks/${orderId}`, {
            comment,
            rating,
        }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error creating feedback:', error);
        return null;
    }
};

export const fetchOrdersInSelectedSlot = async (date, slot) => {
    try {
        const response = await axios.get(`${BASE_URL}/orders/OrderAndSlot/${date}/${slot}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
};

export const fetchOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${BASE_URL}/orders/${orderId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
};

export const fetchInvoices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/invoices`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return null
    }
};

export const fetchFeedback = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/feedbacks`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.put(`${BASE_URL}/orders/${orderId}/status`, { status }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        return null;
    }
};

export const addOrderDescription = async (orderId, description) => {
    try {
        const response = await axios.put(`${BASE_URL}/orders/${orderId}/description`, { description }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error adding order description:', error);
        return null;
    }
};

export const addOrderVeterina = async (orderId, veterinaID) => {
    try {
        const response = await axios.put(`${BASE_URL}/orders/${orderId}/veterina/${veterinaID}`, {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error adding order veterina:', error);
        return null;
    }
};

export const addServiceToOrder = async (orderId, serviceID, quantity) => {
    try {
        const response = await axios.post(`${BASE_URL}/orders/${orderId}/services`, { serviceID, quantity }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error adding service to order:', error);
        return null;
    }
};

export const removeServiceFromOrder = async (orderId, serviceID) => {
    try {
        const response = await axios.delete(`${BASE_URL}/orders/${orderId}/services/${serviceID}`);
        return response.data;
    } catch (error) {
        console.error('Error removing service from order:', error);
        return null;
    }
};

export const updateTravelExpense = async (expenseId, fee, endLocation) => {
    try {
        const response = await axios.put(`${BASE_URL}/expenses/${expenseId}`, { fee, endLocation });
        return response.data;
    } catch (error) {
        console.error('Error updating travel expense:', error);
        return null;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${BASE_URL}/orders`, orderData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        return null;
    }
};

export const DeleteServiceInOrder = async (orderID, serviceID) => {
    try {
        const response = await axios.delete(`${BASE_URL}/orders/${orderID}/services/${serviceID}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error delete service in', { orderID }, ':', error);
        return null;
    }
};

export const addService = async (serviceData) => {
    try {
        const response = await axios.post(`${BASE_URL}/service/add`, serviceData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        return null;
    }
};

export const updateService = async (serviceData) => {
    try {
        const response = await axios.put(`${BASE_URL}/service/update`, serviceData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        return null;
    }
};

export const deleteService = async (serviceID) => {
    try {
        const response = await axios.delete(`${BASE_URL}/service/${serviceID}`);
        return response.data;
    } catch (error) {
        console.error('Error delete service:', error);
        return null;
    }
};


