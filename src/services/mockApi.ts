import { Agency, BookingRequest, SeatSchema, Trip, CellType } from "../types";

// Mock Data
const AGENCIES: Agency[] = [
  { id: "ist-alibeykoy", name: "İstanbul – Alibeyköy" },
  { id: "ist-bayrampasa", name: "İstanbul – Bayrampaşa" },
  { id: "ank-asti", name: "Ankara – AŞTİ" },
  { id: "bursa-otogar", name: "Bursa – Otogar" },
  { id: "izmir-otogar", name: "İzmir – Otogar" },
];

const TRIPS: Trip[] = [
  {
    id: "TRIP-1001",
    company: "Atlas Lines",
    from: "ist-alibeykoy",
    to: "ank-asti",
    departure: "2025-11-02T08:30:00+03:00",
    arrival: "2025-11-02T13:15:00+03:00",
    price: 695,
    availableSeats: 18,
  },
  {
    id: "TRIP-1002",
    company: "Metro Express",
    from: "ist-bayrampasa",
    to: "ank-asti",
    departure: "2025-11-02T09:15:00+03:00",
    arrival: "2025-11-02T14:05:00+03:00",
    price: 720,
    availableSeats: 12,
  },
  {
    id: "TRIP-1003",
    company: "Pamukkale V",
    from: "ist-alibeykoy",
    to: "ank-asti",
    departure: "2025-11-02T14:30:00+03:00",
    arrival: "2025-11-02T19:30:00+03:00",
    price: 750,
    availableSeats: 5,
  },
  {
    id: "TRIP-1004",
    company: "Varan Elite",
    from: "ist-alibeykoy",
    to: "ank-asti",
    departure: "2025-11-02T16:00:00+03:00",
    arrival: "2025-11-02T21:00:00+03:00",
    price: 850,
    availableSeats: 25,
  },
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  getAgencies: async (): Promise<Agency[]> => {
    await delay(500);
    return AGENCIES;
  },

  searchTrips: async (
    from: string,
    to: string,
    date: string
  ): Promise<Trip[]> => {
    await delay(800);
    // For demo purposes, we return the mock trips regardless of the specific date/route if they match the 'from' (or just return all if mocked poorly, but let's try to filter somewhat)
    // In a real mock, we would check dates. Here we just filter by rough logic or return generic trips for demo flow.
    return TRIPS.filter((t) => t.from === from || true).map((t) => ({
      ...t,
      // Hack to update date to requested date so it looks real
      departure: t.departure.replace("2025-11-02", date),
      arrival: t.arrival.replace("2025-11-02", date),
    }));
  },

  getSeatSchema: async (tripId: string): Promise<SeatSchema> => {
    await delay(600);
    const trip = TRIPS.find((t) => t.id === tripId) || TRIPS[0];

    // Generate a seat map
    // 0: seat, 1: seat(taken - logic elsewhere), 2: corridor, 3: door
    const rows = 10;
    const cols = 5;

    // 2+2 Layout with middle corridor
    const cells: CellType[][] = [];
    for (let i = 0; i < rows; i++) {
      if (i === 5) {
        // Middle door
        cells.push([0, 0, 2, 3, 3] as CellType[]);
      } else {
        cells.push([0, 0, 2, 0, 0] as CellType[]);
      }
    }

    // Generate specific seat statuses
    const seats = [];
    let seatCounter = 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (cells[r][c] === 0) {
          // Randomly assign taken, but keep first 10 seats empty for testing
          const isTaken = seatCounter > 10 && Math.random() < 0.3;
          seats.push({
            no: seatCounter,
            row: r,
            col: c,
            status: isTaken ? "taken" : "empty",
            gender: isTaken
              ? Math.random() > 0.5
                ? "male"
                : "female"
              : undefined,
          });
          seatCounter++;
        }
      }
    }

    return {
      tripId,
      layout: { rows, cols, cells },
      // @ts-ignore - simple mock casting
      seats: seats,
      unitPrice: trip.price,
    };
  },

  createBooking: async (
    data: BookingRequest
  ): Promise<{ ok: boolean; pnr: string }> => {
    await delay(1500);
    return {
      ok: true,
      pnr: `PNR-${Math.floor(Math.random() * 1000000)}`,
    };
  },
};
