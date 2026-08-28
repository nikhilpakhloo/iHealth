import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';
import { Doctor } from '../../../core/api/mockData';

const storage = createMMKV({ id: 'bookings-storage' });

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};

export interface Booking {
  id: string;
  doctor: Doctor;
  slot: string;
  status: 'confirmed' | 'pending';
}

interface BookingsState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  confirmBooking: (id: string) => void;
}

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (booking) =>
        set((state) => ({
          bookings: [booking, ...state.bookings],
        })),
      removeBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),
      confirmBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status: 'confirmed' } : b
          ),
        })),
    }),
    {
      name: 'bookings-storage-v1',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
