import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/signup';
  private storageKey = 'fi_restaurant_user';

  constructor(private http: HttpClient) {}

  signup(payload: { name: string; email: string; mobile: number; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return this.http.get<any[]>(url).pipe(
      map(users => {
        if (users && users.length > 0) {
          const user = users[0];
          localStorage.setItem(this.storageKey, JSON.stringify(user));
          return user;
        }
        throw new Error('Invalid credentials');
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getCurrentUser(): any | null {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }
}
