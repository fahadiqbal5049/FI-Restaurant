import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  postRestaurent(data: any) {
    return this._http.post<any>(`${this.baseUrl}/posts`, data).pipe(map((res: any) => {
      return res;
    }));
  }

  getRestaurent() {
    return this._http.get<any>(`${this.baseUrl}/posts`).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteRestaurant(id: number) {
    return this._http.delete<any>(`${this.baseUrl}/posts/${id}`).pipe(map((res: any) => {
      return res;
    }));
  }

  updateRestaurant(id: number, data: any) {
    return this._http.put<any>(`${this.baseUrl}/posts/${id}`, data).pipe(map((res: any) => {
      return res;
    }));
  }
}
