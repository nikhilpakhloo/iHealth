import { mockDatabase } from './mockData';

const SIMULATE_LATENCY = true;
const MIN_LATENCY = 300;
const MAX_LATENCY = 1500;
const ERROR_RATE = 0.1;

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export class MockApiClient {
  static async simulateNetwork() {
    if (!SIMULATE_LATENCY) return;

    const latency = Math.floor(Math.random() * (MAX_LATENCY - MIN_LATENCY + 1)) + MIN_LATENCY;
    await delay(latency);

    if (Math.random() < ERROR_RATE) {
      throw new Error('Network Error: Simulated API Failure (500)');
    }
  }

  static async getProducts({ page = 1, limit = 50, search = '', category = '' } = {}) {
    await this.simulateNetwork();
    let results = mockDatabase.products;

    if (search) {
      results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      results = results.filter(p => p.category === category);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: results.slice(start, end),
      total: results.length,
      page,
      hasMore: end < results.length
    };
  }

  static async getDoctors({ page = 1, limit = 50, search = '', specialty = '' } = {}) {
    await this.simulateNetwork();
    let results = mockDatabase.doctors;

    if (search) {
      results = results.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (specialty) {
      results = results.filter(d => d.specialty === specialty);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: results.slice(start, end),
      total: results.length,
      page,
      hasMore: end < results.length
    };
  }

  static async getHealthRecords({ page = 1, limit = 50 } = {}) {
    await this.simulateNetwork();
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: mockDatabase.records.slice(start, end),
      total: mockDatabase.records.length,
      page,
      hasMore: end < mockDatabase.records.length
    };
  }

  // Simulate a POST request for booking
  static async createBooking(doctorId: string, slot: string) {
    await this.simulateNetwork();

    // Simulate a 409 Conflict if trying to double book (randomly 10% of time for demo)
    if (Math.random() < 0.1) {
      throw new Error('409 Conflict: Slot already booked');
    }

    return { success: true, bookingId: `b_${Date.now()}` };
  }
}
