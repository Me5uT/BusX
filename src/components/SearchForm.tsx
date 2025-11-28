import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Agency } from "../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchSchema = z
  .object({
    from: z.string().min(1),
    to: z.string().min(1),
    date: z.string().min(1),
  })
  .refine((data) => data.from !== data.to, {
    message: "Departure and arrival cannot be the same",
    path: ["to"],
  });

type SearchFormData = z.infer<typeof searchSchema>;

interface Props {
  agencies: Agency[];
  onSearch: (data: SearchFormData) => void;
  isLoading?: boolean;
}

export const SearchForm: React.FC<Props> = ({
  agencies,
  onSearch,
  isLoading,
}) => {
  const { t } = useTranslation();

  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: "ist-alibeykoy",
      to: "ank-asti",
      date: defaultDate,
    },
  });

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200">
      <form
        onSubmit={handleSubmit(onSearch)}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        {/* FROM */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t("common.from")}
          </label>
          <div className="relative">
            <select
              {...register("from")}
              className="w-full p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition-colors"
            >
              {agencies.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          {errors.from && (
            <span className="text-red-500 text-xs">{t("form.required")}</span>
          )}
        </div>

        {/* TO */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t("common.to")}
          </label>
          <div className="relative">
            <select
              {...register("to")}
              className="w-full p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition-colors"
            >
              {agencies.map((a) => (
                <option key={a.id} value={a.id} selected={a.id === "ank-asti"}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          {errors.to && (
            <span className="text-red-500 text-xs">
              {errors.to.message || t("form.required")}
            </span>
          )}
        </div>

        {/* DATE */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t("common.date")}
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            {...register("date")}
            className="w-full p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors.date && (
            <span className="text-red-500 text-xs">{t("form.required")}</span>
          )}
        </div>

        {/* SUBMIT */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-lg shadow-blue-200 dark:shadow-none"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              t("common.search")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
