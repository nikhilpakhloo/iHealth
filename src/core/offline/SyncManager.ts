import NetInfo from '@react-native-community/netinfo';
import { useSyncStore } from './useSyncStore';
import { MockApiClient } from '../api/mockClient';

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
            const { doctorId, slot } = action.payload;
            await MockApiClient.createBooking(doctorId, slot);
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
