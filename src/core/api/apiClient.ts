import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockDatabase } from './mockData';
import { useToastStore } from '../../shared/store/useToastStore';
import i18n from '../i18n/i18n';

const SIMULATE_LATENCY = true;
const MIN_LATENCY = 300;
const MAX_LATENCY = 1500;
const ERROR_RATE = 0.05;

// Create Axios Instance
export const apiClient = axios.create({
  baseURL: 'https://api.ihealth.local/v1',
  timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    config.headers.Authorization = `Bearer dummy-token`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        useToastStore.getState().show(i18n.t('Session expired. Please login again.'), 'error');
      } else if (error.response.status === 409) {
        useToastStore.getState().show(i18n.t('Slot already booked. Please choose another.'), 'error');
      } else {
        useToastStore.getState().show(error.message || i18n.t('An error occurred'), 'error');
      }
    } else if (error.request) {
      useToastStore.getState().show(i18n.t('Network Error. Please check your connection.'), 'error');
    } else {
      useToastStore.getState().show(error.message, 'error');
    }
    return Promise.reject(error);
  }
);

// Setup Mock Adapter
const mock = new MockAdapter(apiClient, { delayResponse: SIMULATE_LATENCY ? 800 : 0 }); // Base delay

// Helper for simulating errors
const withErrorSimulation = (response: any) => {
  if (Math.random() < ERROR_RATE) {
    return [500, { message: 'Simulated API Failure' }];
  }
  return response;
};

// --- Mock Endpoints ---

// Get Products
mock.onGet('/products').reply((config) => {
  const { page = 1, limit = 50, search = '', category = '' } = config.params || {};
  let results = mockDatabase.products;

  if (search) {
    results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (category) {
    results = results.filter(p => p.category === category);
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  
  return withErrorSimulation([200, {
    data: results.slice(start, end),
    total: results.length,
    page,
    hasMore: end < results.length
  }]);
});

// Get Doctors
mock.onGet('/doctors').reply((config) => {
  const { page = 1, limit = 50, search = '', specialty = '' } = config.params || {};
  let results = mockDatabase.doctors;

  if (search) {
    results = results.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (specialty) {
    results = results.filter(d => d.specialty === specialty);
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return withErrorSimulation([200, {
    data: results.slice(start, end),
    total: results.length,
    page,
    hasMore: end < results.length
  }]);
});

// Get Health Records
mock.onGet('/records').reply((config) => {
  const { page = 1, limit = 50 } = config.params || {};
  const start = (page - 1) * limit;
  const end = start + limit;

  return withErrorSimulation([200, {
    data: mockDatabase.records.slice(start, end),
    total: mockDatabase.records.length,
    page,
    hasMore: end < mockDatabase.records.length
  }]);
});

// Create Booking
mock.onPost('/bookings').reply(() => {
  if (Math.random() < 0.1) {
    // Simulate Double Booking Conflict
    return [409, { message: 'Slot already booked' }];
  }
  return withErrorSimulation([200, { success: true, bookingId: `b_${Date.now()}` }]);
});

// Checkout Cart
mock.onPost('/checkout').reply(() => {
  return withErrorSimulation([200, { success: true, orderId: `ord_${Date.now()}` }]);
});
