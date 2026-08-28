import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({ id: 'sync-queue' });

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

export interface SyncAction {
  id: string; // unique uuid for the action
  type: 'BOOK_CONSULTATION';
  payload: any;
  timestamp: number;
}

interface SyncState {
  queue: SyncAction[];
  enqueueAction: (action: Omit<SyncAction, 'id' | 'timestamp'>) => void;
  removeAction: (id: string) => void;
  clearQueue: () => void;
}

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      queue: [],
      enqueueAction: (action) =>
        set((state) => ({
          queue: [
            ...state.queue,
            { ...action, id: `action_${Date.now()}_${Math.random()}`, timestamp: Date.now() },
          ],
        })),
      removeAction: (id) =>
        set((state) => ({
          queue: state.queue.filter((a) => a.id !== id),
        })),
      clearQueue: () => set({ queue: [] }),
    }),
    {
      name: 'sync-queue-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
