import { create } from 'zustand';

export interface FeatureFlags {
  enableNewBookingFlow: boolean;
  enableRecommendations: boolean;
  enableVideoConsultations: boolean;
}

interface FeatureFlagState {
  flags: FeatureFlags;
  setFlag: (key: keyof FeatureFlags, value: boolean) => void;
}

export const useFeatureFlags = create<FeatureFlagState>((set) => ({
  flags: {
    enableNewBookingFlow: false,
    enableRecommendations: true,
    enableVideoConsultations: false,
  },
  setFlag: (key, value) =>
    set((state) => ({
      flags: {
        ...state.flags,
        [key]: value,
      },
    })),
}));
