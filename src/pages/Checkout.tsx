import React from "react";
import { useBookingStore } from "../store/useBookingStore";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { mockApi } from "../services/mockApi";

const passengerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  idNo: z.string().min(11).max(11), // Turkish ID length usually
  gender: z.enum(["male", "female"]),
});

const checkoutSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  passengers: z.array(passengerSchema),
  agreement: z.boolean().refine((val) => val === true, {
    message: "Required",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedTrip, selectedSeats } = useBookingStore();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Redirect if state missing
  React.useEffect(() => {
    if (!selectedTrip || selectedSeats.length === 0) navigate("/");
  }, [selectedTrip, selectedSeats, navigate]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      passengers: selectedSeats.map(() => ({
        firstName: "",
        lastName: "",
        idNo: "",
        gender: "male",
      })),
      agreement: false,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!selectedTrip) return;
    setIsSubmitting(true);
    try {
      await mockApi.createBooking({
        tripId: selectedTrip.id,
        seats: selectedSeats,
        contact: { email: data.email, phone: data.phone },
        // @ts-ignore
        passengers: data.passengers.map((p, i) => ({
          ...p,
          seatNo: selectedSeats[i],
        })),
      });

      // Don't reset booking here to avoid triggering the 'missing state' useEffect above
      // We will reset it on the Success page mount.
      navigate("/success");
    } catch (e) {
      alert(t("common.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedTrip) return null;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
          {t("form.passengerTitle")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Passenger Forms */}
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold px-2 py-1 rounded text-sm">
                    Seat {selectedSeats[index]}
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Passenger {index + 1}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      {t("form.name")}
                    </label>
                    <input
                      {...register(`passengers.${index}.firstName`)}
                      className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                    />
                    {errors.passengers?.[index]?.firstName && (
                      <span className="text-red-500 text-xs">
                        {t("form.required")}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      {t("form.surname")}
                    </label>
                    <input
                      {...register(`passengers.${index}.lastName`)}
                      className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                    />
                    {errors.passengers?.[index]?.lastName && (
                      <span className="text-red-500 text-xs">
                        {t("form.required")}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      {t("form.idNo")}
                    </label>
                    <input
                      {...register(`passengers.${index}.idNo`)}
                      placeholder="11 digits"
                      className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                    />
                    {errors.passengers?.[index]?.idNo && (
                      <span className="text-red-500 text-xs">
                        {t("form.required")}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      {t("form.gender")}
                    </label>
                    <select
                      {...register(`passengers.${index}.gender`)}
                      className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                    >
                      <option value="male">{t("form.male")}</option>
                      <option value="female">{t("form.female")}</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">
              {t("form.contactTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {t("form.invalidEmail")}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {t("form.phone")}
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs">
                    {t("form.required")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Total & Agreement */}
          <div className="flex flex-col items-end space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agreement"
                {...register("agreement")}
                className="w-4 h-4 text-blue-600 rounded bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
              <label
                htmlFor="agreement"
                className="text-sm text-slate-600 dark:text-slate-300"
              >
                {t("form.agreement")}
              </label>
            </div>
            {errors.agreement && (
              <span className="text-red-500 text-xs">{t("form.required")}</span>
            )}

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {t("seats.total")}
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ₺{selectedSeats.length * selectedTrip.price}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-200 dark:shadow-none transition-all disabled:opacity-50"
              >
                {isSubmitting ? t("common.loading") : t("common.confirm")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};
