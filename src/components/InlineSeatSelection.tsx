import React, { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockApi } from "../services/mockApi";
import { SeatMap } from "../components/SeatMap";
import { useBookingStore } from "../store/useBookingStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Trip } from "../types";

interface Props {
  trip: Trip;
  onClose: () => void;
}

export const InlineSeatSelection: React.FC<Props> = memo(
  ({ trip, onClose }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { selectedSeats, toggleSeat, selectTrip } = useBookingStore();

    // Ensure current trip is selected in store when this component renders
    React.useEffect(() => {
      selectTrip(trip);
    }, [trip, selectTrip]);

    const { data: schema, isLoading } = useQuery({
      queryKey: ["seatMap", trip.id],
      queryFn: () => mockApi.getSeatSchema(trip.id),
    });

    const handleContinue = () => {
      if (selectedSeats.length > 0) {
        navigate("/checkout");
      }
    };

    const totalPrice = selectedSeats.length * trip.price;

    if (isLoading || !schema) {
      return (
        <div className="p-10 text-center text-slate-500 dark:text-slate-400">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          ></div>
          <div className="mt-2 text-sm">{t("common.loading")}</div>
        </div>
      );
    }

    return (
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 md:p-6 rounded-b-xl border-t border-slate-200 dark:border-slate-700 animate-fade-in">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Seat Map */}
          <div className="flex-1 flex justify-center">
            <SeatMap
              schema={schema}
              selectedSeats={selectedSeats}
              onToggleSeat={toggleSeat}
            />
          </div>

          {/* Summary & Action */}
          <div className="xl:w-72 flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-800 dark:text-white mb-4">
                {t("seats.selected")}
              </h4>

              <div className="min-h-[60px]">
                {selectedSeats.length === 0 ? (
                  <p className="text-slate-400 text-sm italic">
                    Select a seat from the plan.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((s) => (
                      <span
                        key={s}
                        className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold"
                      >
                        No. {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {selectedSeats.length === 4 && (
                <p className="text-orange-500 text-xs font-medium mt-2">
                  {t("seats.maxSeats")}
                </p>
              )}

              <div className="border-t border-slate-100 dark:border-slate-700 my-4"></div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  {t("seats.total")}
                </span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  ₺{totalPrice}
                </span>
              </div>

              <button
                onClick={handleContinue}
                disabled={selectedSeats.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-200 dark:shadow-none mb-2"
              >
                {t("common.continue")}
              </button>

              <button
                onClick={onClose}
                className="w-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium py-2"
              >
                {t("common.close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
