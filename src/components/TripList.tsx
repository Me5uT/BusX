import React, { useState, useMemo, useCallback } from "react";
import { Trip } from "../types";
import { useTranslation } from "react-i18next";
import { InlineSeatSelection } from "./InlineSeatSelection";

interface Props {
  trips: Trip[];
  onSelect: (trip: Trip) => void;
}

type SortType = "price-asc" | "price-desc" | "time-asc" | "time-desc";

export const TripList: React.FC<Props> = ({ trips }) => {
  const { t } = useTranslation();
  const [sort, setSort] = useState<SortType>("time-asc");
  const [expandedTripId, setExpandedTripId] = useState<string | null>(null);

  const sortedTrips = useMemo(() => {
    return [...trips].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "time-asc")
        return (
          new Date(a.departure).getTime() - new Date(b.departure).getTime()
        );
      return new Date(b.departure).getTime() - new Date(a.departure).getTime();
    });
  }, [trips, sort]);

  const handleToggle = useCallback((tripId: string) => {
    setExpandedTripId((prev) => (prev === tripId ? null : tripId));
  }, []);

  if (trips.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center space-x-2 transition-colors duration-200">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
          {t("filters.sortBy")}:
        </span>
        <select
          className="text-sm bg-transparent font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortType)}
        >
          <option value="time-asc" className="dark:bg-slate-800">
            {t("filters.timeAsc")}
          </option>
          <option value="time-desc" className="dark:bg-slate-800">
            {t("filters.timeDesc")}
          </option>
          <option value="price-asc" className="dark:bg-slate-800">
            {t("filters.priceAsc")}
          </option>
          <option value="price-desc" className="dark:bg-slate-800">
            {t("filters.priceDesc")}
          </option>
        </select>
      </div>

      <div className="grid gap-4">
        {sortedTrips.map((trip) => {
          const dep = new Date(trip.departure);
          const arr = new Date(trip.arrival);
          const durationHrs = Math.floor(
            (arr.getTime() - dep.getTime()) / (1000 * 60 * 60)
          );
          const durationMins = Math.floor(
            ((arr.getTime() - dep.getTime()) % (1000 * 60 * 60)) / (1000 * 60)
          );
          const isExpanded = expandedTripId === trip.id;

          return (
            <div
              key={trip.id}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
              }`}
            >
              <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Company & Time */}
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    {trip.company}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {dep.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {t("common.from")}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-4">
                      <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1">
                        {durationHrs}h {durationMins}m
                      </div>
                      <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-600 relative">
                        <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500"></div>
                        <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500"></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {arr.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {t("common.to")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-auto md:border-l md:border-slate-100 dark:md:border-slate-700 md:pl-6 gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₺{trip.price}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {trip.availableSeats} seats left
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(trip.id)}
                    className={`${
                      isExpanded
                        ? "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white"
                        : "bg-slate-900 text-white dark:bg-blue-600"
                    } px-6 py-2.5 rounded-lg font-medium hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors`}
                  >
                    {isExpanded ? t("common.close") : t("common.selectSeat")}
                  </button>
                </div>
              </div>

              {/* Inline Selection Panel */}
              {isExpanded && (
                <InlineSeatSelection
                  trip={trip}
                  onClose={() => setExpandedTripId(null)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
