import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Reservation {
  id?: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) {}

  createReservation(reservation: Reservation): Observable<Reservation> {
    // In production, this would be an HTTP POST
    // For now, return mock success
    return this.http.post<Reservation>(this.apiUrl, {
      ...reservation,
      id: Date.now(),
      status: 'pending'
    });
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  getAvailableTimes(date: string, partySize: number): Observable<string[]> {
    // Mock available times - in production, this would check against existing reservations
    const times = [
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
    ];
    return of(times);
  }
}

