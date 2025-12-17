import axios from 'axios';

const API_BASE_URL = 'https://badminton-court-booking-odoi.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const availabilityService = {
    getCourts: (date, startTime, endTime) =>
        api.get('/avalibility/courts', { params: { date, startTime, endTime } }),

    getCoaches: (date, startTime, endTime) =>
        api.get('/avalibility/coaches', { params: { date, startTime, endTime } }),

    getEquipment: (date, startTime, endTime) =>
        api.get('/avalibility/equipments', { params: { date, startTime, endTime } }),
};

export const bookingService = {
    create: (bookingData) => api.post('/booking/create', bookingData),
    cancel: (bookingId) => api.delete(`/booking/delete/${bookingId}`),
};

export const pricingService = {
    preview: (data) => api.post('/pricing/preview', data),
};

export const adminService = {
    getCourts: () => api.get('/admin/courts'),
    createCourt: (data) => api.post('/admin/courts', data),
    updateCourt: (id, data) => api.put(`/admin/courts/${id}`, data),

    getPricingRules: () => api.get('/admin/pricing-rules'),
    createPricingRule: (data) => api.post('/admin/pricing-rules', data),
    updatePricingRule: (id, data) => api.put(`/admin/pricing-rules/${id}`, data),

    getEquipment: () => api.get('/admin/equipment'),
    updateEquipment: (id, data) => api.put(`/admin/equipment/${id}`, data),

    getCoaches: () => api.get('/admin/coaches'),
    updateCoach: (id, data) => api.put(`/admin/coaches/${id}`, data),
};

export default api;
