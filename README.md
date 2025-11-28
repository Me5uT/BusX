
# BusX - Modern Bus Ticket Booking System

BusX is a modern, responsive Single Page Application (SPA) for booking bus tickets. Built with React, TypeScript, and Vite, it emphasizes clean UI/UX, performance, and accessibility.

## 🚀 Features

- **Real-time Search**: Search for trips based on departure, destination, and date.
- **Interactive Seat Map**: 2+2 layout selection with visual cues for taken, empty, and selected seats (max 4).
- **Inline Selection**: Seamless UX allowing users to select seats directly within the trip listing accordion.
- **Dark Mode**: Fully supported dark/light theme toggle.
- **Localization (i18n)**: Instant switching between Turkish (TR) and English (EN).
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **State Management**: Robust booking flow using Zustand.
- **Validation**: Strict form validation using Zod and React Hook Form.

## 🛠 Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand (Global), React Query (Server/Async)
- **Routing**: React Router DOM (MemoryRouter for compatibility)
- **Forms**: React Hook Form + Zod + @hookform/resolvers
- **Internationalization**: i18next + react-i18next
- **Testing**: Playwright (E2E)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Steps

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

3.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 🧪 Testing

This project uses **Playwright** for End-to-End (E2E) testing to ensure critical user flows work as expected.

### Running E2E Tests

1.  **Install Playwright Browsers** (First time only)
    ```bash
    npx playwright install
    ```

2.  **Run Tests (Headless Mode)**
    This runs all tests in the console.
    ```bash
    npx playwright test
    ```

3.  **Run Tests with UI**
    Opens an interactive UI to watch tests run.
    ```bash
    npx playwright test --ui
    ```

4.  **View Report**
    ```bash
    npx playwright show-report
    ```

### Test Coverage
The current E2E test suite (`tests/e2e.spec.ts`) covers the "Happy Path":
1.  Loads the Home page.
2.  Performs a Trip Search.
3.  Expands a trip and selects 2 seats.
4.  Proceeds to Checkout.
5.  Fills out passenger and contact forms with validation checks.
6.  Accepts the agreement and confirms payment.
7.  Verifies redirection to the Success page.

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── InlineSeatSelection.tsx  # Logic for expanding trip row
│   ├── Layout.tsx               # Main wrapper with Header/Footer
│   ├── SearchForm.tsx
│   ├── SeatMap.tsx              # Visual grid for seats
│   └── ...
├── pages/            # Page-level components
│   ├── Checkout.tsx
│   ├── Home.tsx
│   └── Success.tsx
├── services/         # API handling
│   └── mockApi.ts    # Simulated backend with delays
├── store/            # State management
│   └── useBookingStore.ts # Zustand store for booking session
├── types/            # TypeScript interfaces
├── App.tsx           # Router configuration
├── i18n.ts           # Localization setup
└── main.tsx          # Entry point
tests/
└── e2e.spec.ts       # Playwright E2E scenarios
```

## 🏗 Architecture Decisions

1.  **Inline Seat Selection**: Instead of navigating to a separate `/seat-selection/:id` page, the seat map is rendered inside the `TripList` accordion. This reduces friction and context switching for the user.
2.  **Mock API**: The `mockApi.ts` service simulates network latency (`delay()` function) to demonstrate loading states and React Query's caching capabilities.
3.  **MemoryRouter**: Used instead of `BrowserRouter` to ensure compatibility with varied hosting environments (like restricted sandboxes) where History API might be limited.
4.  **Zod Validation**: Schema-first validation ensures that invalid data (e.g., incorrect ID numbers or emails) never reaches the "Mock Backend".

## 🎨 Design & Accessibility

- **Contrast**: Text colors are chosen to be readable in both Light (Slate-900) and Dark (White/Slate-200) modes.
- **Inputs**: Form inputs are explicitly styled with white backgrounds in light mode to ensure distinct visibility against the page background.
- **Aria Labels**: Interactive elements like Seats have aria-labels (e.g., "Seat 15 Taken") for screen readers.

---
**Developer**: BusX Systems
