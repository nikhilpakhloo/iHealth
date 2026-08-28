# Ayurvedic Super App 🌿

A production-ready React Native application built to demonstrate high-performance architecture, offline-first capabilities, and scalable design patterns. This app simulates a fully functional ecosystem consisting of Consultations, an E-commerce Shop, and Health Records without relying on a real backend.

## 🚀 Core Features

### Module 1: Consultations
- **Doctor Listing & Search:** Rendered using `@shopify/flash-list` for buttery-smooth scrolling of 5,000+ mock doctors. Includes a debounced search to optimize simulated network requests.
- **Offline-First Booking:** Users can book appointments even when completely disconnected from the internet.
- **Background Syncing:** A custom `SyncManager` detects network restoration and automatically processes queued offline bookings.
- **Conflict Handling:** Simulates real-world API behaviors (e.g., random `409 Conflict` errors for double bookings) handled elegantly with global toast notifications.

### Module 2: Shop
- **Infinite Scrolling E-commerce:** Browsing through 20,000 mock products lazily loaded via `react-query` infinite pagination.
- **Category Filtering:** Filter products dynamically without UI lag.
- **Persistent Cart:** Powered by Zustand and `react-native-mmkv`, ensuring the user's cart state survives app restarts and offline scenarios instantly.

### Module 3: Health Records
- **Dynamic Timeline Grouping:** Fetches 10,000 flat health records and intelligently groups them by Month/Year using `useMemo` for high-performance timeline rendering.
- **Multi-Tab Layout:** Separates records into Timeline, Lab Results, Prescriptions, and Vitals.

## 🏆 Bonus & Polish

- **🌐 Localization (i18n):** Full support for English and Hindi. Dynamic translation of UI elements, mock data metadata (categories, specialties), and global toast notifications.
- **🎛️ Feature Flags:** A dedicated Zustand store (`useFeatureFlags`) mimicking a remote configuration setup (e.g., Firebase Remote Config) to easily toggle A/B test features (like new booking flows or video consultations).
- **💾 Secure & Fast Storage:** Swapped out traditional `AsyncStorage` for `react-native-mmkv`, providing synchronous, encrypted, and ultra-fast local storage.

## 🏗️ Architectural Decisions & Tech Stack

### 1. State Management: Zustand + React Query
- **Why?** Redux is often too boilerplate-heavy. **Zustand** provides a lightweight, scalable solution for global UI state (like the Cart and Feature Flags). **React Query** handles server state (fetching, caching, and infinite pagination).
- **Offline Caching:** React Query is wrapped with `react-query-persist-client` pointing to an MMKV buster. This means if you load doctors/products while online, they instantly appear the next time you open the app offline.

### 2. Network Simulation: Axios + Mock Adapter
- **Why?** Since the assignment requires working without a backend, `axios-mock-adapter` allows the app to function *exactly* as if it were connected to a production server.
- **Interceptors:** Axios interceptors are set up to catch mock `401` and `409` errors and translate them into global UI Toast alerts.

### 3. List Virtualization: Shopify FlashList
- **Why?** Standard `FlatList` drops frames when rendering thousands of items. `FlashList` recycles views efficiently, ensuring steady 60 FPS even when scrolling through 20,000 products with images.

### 4. Background Sync: NetInfo + Queue Store
- **Why?** To provide a true "Offline-First" experience, any action that mutates server data (like Booking a Consultation) is appended to an offline queue if the network is unreachable. `SyncManager` listens to `@react-native-community/netinfo` and flushes the queue via background processing when connectivity returns.

## 🛠️ Getting Started

1. Clone the repository.
2. Run `npm install`
3. Run `npm run ios` or `npm run android`

*No backend setup required. All data is deterministically mocked and generated at runtime.*
