import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService, Reservation } from '../services/reservation.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservationForm!: FormGroup;
  availableTimes: string[] = [];
  selectedDate = '';
  loadingTimes = false;
  minDate = '';
  maxDate = '';

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    this.maxDate = maxDate.toISOString().split('T')[0];

    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      partySize: [2, [Validators.required, Validators.min(1), Validators.max(20)]],
      specialRequests: ['']
    });

    this.reservationForm.get('date')?.valueChanges.subscribe(date => {
      if (date) {
        this.loadAvailableTimes(date, this.reservationForm.get('partySize')?.value || 2);
      }
    });

    this.reservationForm.get('partySize')?.valueChanges.subscribe(size => {
      if (this.reservationForm.get('date')?.value) {
        this.loadAvailableTimes(this.reservationForm.get('date')?.value, size);
      }
    });
  }

  loadAvailableTimes(date: string, partySize: number): void {
    this.loadingTimes = true;
    this.reservationService.getAvailableTimes(date, partySize).subscribe({
      next: (times) => {
        this.availableTimes = times;
        this.loadingTimes = false;
        if (this.reservationForm.get('time')?.value && !times.includes(this.reservationForm.get('time')?.value)) {
          this.reservationForm.get('time')?.setValue('');
        }
      },
      error: () => {
        this.loadingTimes = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.auth.isLoggedIn()) {
      // redirect to login and return after login
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/reservations' } });
      return;
    }

    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      return;
    }

    const reservation: Reservation = this.reservationForm.value;

    this.reservationService.createReservation(reservation).subscribe({
      next: () => {
        alert('Reservation confirmed! You will receive a confirmation email shortly.');
        this.reservationForm.reset();
        this.reservationForm.patchValue({ partySize: 2 });
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Reservation error:', error);
        alert('There was an error processing your reservation. Please try again.');
      }
    });
  }
}

