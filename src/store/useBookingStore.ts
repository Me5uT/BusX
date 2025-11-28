import { create } from "zustand";
import { Trip, Passenger, ContactInfo } from "../types";

interface BookingState {
  selectedTrip: Trip | null;
  selectedSeats: number[];
  passengers: Passenger[];
  contactInfo: ContactInfo | null;

  // Actions
  selectTrip: (trip: Trip) => void;
  toggleSeat: (seatNo: number) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setContactInfo: (info: ContactInfo) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedTrip: null,
  selectedSeats: [],
  passengers: [],
  contactInfo: null,

  selectTrip: (trip) =>
    set({
      selectedTrip: trip,
      selectedSeats: [],
      passengers: [],
      contactInfo: null,
    }),

  toggleSeat: (seatNo) =>
    set((state) => {
      const isSelected = state.selectedSeats.includes(seatNo);
      if (isSelected) {
        return {
          selectedSeats: state.selectedSeats.filter((s) => s !== seatNo),
        };
      }
      if (state.selectedSeats.length >= 4) {
        return state; // Limit max 4
      }
      return {
        selectedSeats: [...state.selectedSeats, seatNo].sort((a, b) => a - b),
      };
    }),

  setPassengers: (passengers) => set({ passengers }),
  setContactInfo: (info) => set({ contactInfo: info }),

  resetBooking: () =>
    set({
      selectedTrip: null,
      selectedSeats: [],
      passengers: [],
      contactInfo: null,
    }),
}));
