import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  register(user: RegisterRequest):Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(`${this.apiUrl}/register`, user);
  }

  setUser(user: RegisterRequest): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(){
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

}
