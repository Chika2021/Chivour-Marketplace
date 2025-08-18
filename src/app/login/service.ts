import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface loginRequest {
  email:string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl =  'http://localhost:3000/user';



  constructor(private http: HttpClient){}

  login( user: loginRequest):Observable<loginRequest> {
    return this.http.post<loginRequest>(`${this.apiUrl}/login`, user)
  }

    setUser(user: loginRequest) {
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
