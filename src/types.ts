export interface Agency {
  id: string;
  name: string;
}

export interface Trip {
  id: string;
  company: string;
  from: string;
  to: string;
  departure: string; // ISO Date string
  arrival: string; // ISO Date string
  price: number;
  availableSeats: number;
}

export type SeatStatus = 'empty' | 'taken' | 'selected' | 'gap';
export type CellType = 0 | 1 | 2 | 3; // 0: empty(seat), 1: taken(seat), 2: corridor, 3: door

export interface SeatObject {
  no: number;
  row: number;
  col: number;
  status: 'empty' | 'taken';
  gender?: 'male' | 'female'; // Optional gender info for taken seats
}

export interface SeatLayout {
  rows: number;
  cols: number;
  cells: CellType[][]; // Matrix of grid layout
}

export interface SeatSchema {
  tripId: string;
  layout: SeatLayout;
  seats: SeatObject[];
  unitPrice: number;
}

export interface Passenger {
  seatNo: number;
  firstName: string;
  lastName: string;
  idNo: string;
  gender: 'male' | 'female';
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface BookingRequest {
  tripId: string;
  seats: number[];
  contact: ContactInfo;
  passengers: Passenger[];
}