import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockApi } from "../services/mockApi";
import { SearchForm } from "../components/SearchForm";
import { TripList } from "../components/TripList";
import { Layout } from "../components/Layout";
import { useBookingStore } from "../store/useBookingStore";
import { useTranslation } from "react-i18next";

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useState<{
    from: string;
    to: string;
    date: string;
  } | null>(null);
  const { t } = useTranslation();
  // We keep selectTrip here just to satisfy the TripList interface if needed,
  // but logic is now handled internally by InlineSeatSelection mostly.
  const selectTrip = useBookingStore((state) => state.selectTrip);

  const { data: agencies = [] } = useQuery({
    queryKey: ["agencies"],
    queryFn: mockApi.getAgencies,
  });

  const {
    data: trips = [],
    isLoading: isTripsLoading,
    isFetched,
  } = useQuery({
    queryKey: ["trips", searchParams],
    queryFn: () =>
      searchParams
        ? mockApi.searchTrips(
            searchParams.from,
            searchParams.to,
            searchParams.date
          )
        : Promise.resolve([]),
    enabled: !!searchParams,
  });

  const handleSearch = (data: { from: string; to: string; date: string }) => {
    setSearchParams(data);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
            {t("common.where")}{" "}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t("common.whereDescription")}
          </p>
        </div>

        <SearchForm
          agencies={agencies}
          onSearch={handleSearch}
          isLoading={isTripsLoading}
        />

        {isFetched && (
          <div className="animate-fade-in">
            <TripList trips={trips} onSelect={selectTrip} />
            {trips.length === 0 && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                {t("common.noTripsFound")}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
