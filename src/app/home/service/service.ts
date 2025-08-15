import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeModel } from '../model/home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:3000/products';
  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<HomeModel[]> {
    return this.httpClient.get<HomeModel[]>(this.apiUrl);
  }
  
}
