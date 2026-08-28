import NetInfo from '@react-native-community/netinfo';
import { useSyncStore } from './useSyncStore';
import { useBookingsStore } from '../../features/consultations/store/useBookingsStore';
import { apiClient } from '../api/apiClient';
class SyncManagerClass {
  private isProcessing = false;

  init() {
    NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable !== false) {
        this.processQueue();
      }
    });
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      const { queue, removeAction } = useSyncStore.getState();
      
      for (const action of queue) {
        if (action.type === 'BOOK_CONSULTATION') {
          try {
            const { doctorId, slot, doctor } = action.payload;
            const response = await apiClient.post('/bookings', { doctorId, slot });
            
            // Confirm the booking
            const bookings = useBookingsStore.getState().bookings;
            const pendingBooking = bookings.find(b => b.doctor.id === doctorId && b.slot === slot && b.status === 'pending');
            
            if (pendingBooking) {
              useBookingsStore.getState().removeBooking(pendingBooking.id);
              useBookingsStore.getState().addBooking({
                id: response.data?.bookingId || `b_${Date.now()}`,
                doctor,
                slot,
                status: 'confirmed'
              });
            }

            // If successful, remove from queue
            removeAction(action.id);
            console.log(`[SyncManager] Successfully synced action ${action.id}`);
          } catch (error: any) {
            // If it's a conflict (409), we should also remove it because it can't be retried
            if (error.message && error.message.includes('409')) {
              removeAction(action.id);
              console.log(`[SyncManager] Removed action ${action.id} due to permanent 409 Conflict`);
            } else {
              // Network error, keep in queue
              console.log(`[SyncManager] Retrying action ${action.id} failed, keeping in queue`);
            }
          }
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }
}

export const SyncManager = new SyncManagerClass();
