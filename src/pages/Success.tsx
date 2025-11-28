import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { useBookingStore } from "../store/useBookingStore";

export const Success: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resetBooking } = useBookingStore();

  // Clear the booking session when this page loads
  useEffect(() => {
    resetBooking();
  }, [resetBooking]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 text-center">
          {t("success.title")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-center max-w-md">
          {t("success.message")}
        </p>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 mb-8 text-center shadow-sm w-64">
          <p className="text-sm text-slate-400 uppercase tracking-wide mb-1">
            {t("success.pnr")}
          </p>
          <p className="text-2xl font-mono font-bold text-slate-800 dark:text-white">
            PNR-{Math.floor(Math.random() * 10000)}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-slate-900 dark:bg-slate-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors shadow-lg shadow-slate-200 dark:shadow-none"
        >
          {t("success.home")}
        </button>
      </div>
    </Layout>
  );
};
