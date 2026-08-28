# Ayurvedic Super App 🌿

A production-ready React Native application built to demonstrate high-performance architecture, offline-first capabilities, and scalable design patterns. This app simulates a fully functional ecosystem consisting of Consultations, an E-commerce Shop, and Health Records without relying on a real backend.

## 📁 Folder Structure

The project follows a **feature-based** folder structure, which scales significantly better than standard type-based structures for large apps.

```
src/
├── app/                  # App entry points and global configurations
├── core/                 # Core infrastructure (API, Theme, Offline Sync, i18n)
├── features/             # Independent domain modules
│   ├── consultations/    # Module 1: Doctor Booking
│   ├── shop/             # Module 2: E-commerce
│   ├── records/          # Module 3: Health Timeline
│   └── splash/           # Splash & Onboarding
├── navigation/           # React Navigation setup and config
└── shared/               # Shared cross-domain UI components & hooks
```

## 🏗️ Architectural Decisions

1. **Feature-Driven Design:** Code is grouped by feature (`features/shop`, `features/consultations`). This encapsulates logic, making it easier for large teams to work in parallel without merge conflicts and paving the way for potential micro-frontend architecture.
2. **Mock Network Layer:** To fulfill the "no backend" requirement elegantly, we integrated `axios-mock-adapter`. This allows the UI to consume standard Axios endpoints (`/doctors`, `/products`), completely decoupling the UI from the mock data logic and enabling an instant drop-in replacement when a real backend is ready.
3. **Storage Engine:** Standard `AsyncStorage` is asynchronous and string-based, which causes bottlenecks. We chose `react-native-mmkv`—a blazing fast, synchronous C++ storage engine to back all persistent stores.

## 🧠 State Management Choice

We opted for a dual-store strategy, utilizing **Zustand** and **React Query**:
- **Zustand** is used for strictly **Client/UI State** (Cart items, Feature Flags, Pending Sync Queue). It requires virtually zero boilerplate compared to Redux and scales better.
- **React Query** handles all **Server State**. Fetching, caching, infinite pagination, and background refetching are delegated to React Query. It is backed by `react-query-persist-client` writing to MMKV, allowing instant cache hits.

## ⚡ Performance Optimizations

- **FlashList Virtualization:** The assignment requires rendering huge lists (20k products, 5k doctors, 10k records). The native `FlatList` drops frames under this load. We implemented `@shopify/flash-list` across the app to recycle views, guaranteeing a smooth 60 FPS.
- **Debounced Network Requests:** In the Consultation and Shop search bars, `useDebounce` delays the API query by 300ms while typing, drastically cutting down on unnecessary simulated network calls.
- **Memoization (`useMemo`):** Generating the Timeline from 10,000 flat records is computationally heavy. Grouping logic is memoized to prevent recalculation on every render.

## 📴 Offline Strategy

The app utilizes a robust **Offline-First** model:
1. **Instant Reads:** React Query caches all API responses into MMKV. When offline, users can still instantly view previously loaded doctors, products, and records.
2. **Action Queuing (SyncManager):** When a user books a doctor offline, the action is intercepted and stored in a Zustand queue (`useSyncStore`).
3. **Background Sync:** The `SyncManager` listens to `@react-native-community/netinfo` events. Upon network restoration, it silently flushes the queue in the background and upgrades the booking status from "Pending (Offline)" to "Confirmed".

## ⚖️ Trade-offs Made

1. **Mock Data Generation vs Memory:** To simulate 35,000 entities, the mock database generates objects in memory upon initialization. On low-end devices, this initial generation creates a slight memory spike. In production, this data would exist purely on the database layer.
2. **No Deep Navigation Nesting:** To maintain navigation clarity, the architecture strictly isolates tabs and their stacks. The trade-off is slightly more boilerplate in `TabNavigator.tsx` vs a deeply nested unstructured flow.
3. **Aesthetics over Granular Typing:** Some complex API mock types use basic types rather than deep discriminated unions in favor of moving quickly and delivering a premium, fully-functional UI within the 72-hour timeframe limit.

## 🔮 Future Improvements

- **End-to-End Testing (Detox):** While business logic and hooks are type-safe, implementing E2E UI testing with Detox would guarantee flow integrity across regressions.
- **React Native Reanimated:** Implementing gesture-based interactions (like swipe-to-delete in Cart) and shared element transitions (opening Doctor Details) using Reanimated would further elevate the premium feel.
- **JSI / TurboModules Migration:** Ensure all native modules align with the New Architecture Fabric renderer to future-proof the application.
- **Real-Time WebSockets:** Replace the mock interval updates with WebSockets or SSE for live available slot reductions when other users book slots.
