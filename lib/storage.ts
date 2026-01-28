import { Booking } from "./types";

const STORAGE_KEYS = {
  BOOKINGS: "studio_bookings",
  ADMIN_AUTH: "studio_admin_auth",
} as const;

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveBookings(bookings: Booking[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

export function addBooking(booking: Booking): void {
  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
}

export function updateBooking(id: string, updates: Partial<Booking>): void {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updates };
    saveBookings(bookings);
  }
}

export function deleteBooking(id: string): void {
  const bookings = getBookings();
  saveBookings(bookings.filter((b) => b.id !== id));
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const auth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
  return auth === "true";
}

export function setAdminAuth(authenticated: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(authenticated));
}

export function resetDemoData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
  localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
}

