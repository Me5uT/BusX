import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { mockApi } from "../services/mockApi";
import { SeatMap } from "../components/SeatMap";
import { useBookingStore } from "../store/useBookingStore";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";

export const SeatSelection: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { selectedTrip, selectedSeats, toggleSeat } = useBookingStore();

  const { data: schema, isLoading } = useQuery({
    queryKey: ["seatMap", tripId],
    queryFn: () => mockApi.getSeatSchema(tripId!),
    enabled: !!tripId,
  });

  React.useEffect(() => {
    if (!selectedTrip) {
      // If refresh happens, we lose state. Redirect home.
      navigate("/");
    }
  }, [selectedTrip, navigate]);

  if (!selectedTrip) {
    return null;
  }

  if (isLoading || !schema) {
    return (
      <Layout>
        <div className="text-center py-20">{t("common.loading")}</div>
      </Layout>
    );
  }

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate("/checkout");
    }
  };

  const totalPrice = selectedSeats.length * selectedTrip.price;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Seat Map */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800">
              {t("seats.selectTitle")}
            </h2>
            <span className="text-sm text-slate-500">
              {selectedTrip.from} → {selectedTrip.to}
            </span>
          </div>
          <SeatMap
            schema={schema}
            selectedSeats={selectedSeats}
            onToggleSeat={toggleSeat}
          />
        </div>

        {/* Right: Summary Panel */}
        <div className="lg:w-80">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-slate-800">
              {t("seats.selected")}
            </h3>

            {selectedSeats.length === 0 ? (
              <p className="text-slate-400 text-sm mb-4">
                Please select a seat to continue.
              </p>
            ) : (
              <div className="space-y-3 mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((s) => (
                    <span
                      key={s}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-bold"
                    >
                      No. {s}
                    </span>
                  ))}
                </div>
                {selectedSeats.length === 4 && (
                  <p className="text-orange-500 text-xs font-medium">
                    {t("seats.maxSeats")}
                  </p>
                )}
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                  <span className="text-slate-500">{t("seats.total")}</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₺{totalPrice}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors shadow-blue-200"
            >
              {t("common.continue")}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
