import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
  show: (message: string, type?: ToastType, duration?: number) => void;
  hide: () => void;
}

let timeoutId: ReturnType<typeof setTimeout>;

export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  message: '',
  type: 'info',
  show: (message, type = 'info', duration = 3000) => {
    set({ visible: true, message, type });
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      set({ visible: false });
    }, duration);
  },
  hide: () => set({ visible: false }),
}));
