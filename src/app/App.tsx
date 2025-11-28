import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Checkout } from "../pages/Checkout";
import { Success } from "../pages/Success";
import ErrorBoundary from "../components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
