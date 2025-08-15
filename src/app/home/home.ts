import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeService } from './service/service';
import { Observable } from 'rxjs';
import { HomeModel } from './model/home.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  homeData: HomeModel[] = [];
  newName: string = '';
  newDescription: string = '';
  newPrice: number = 0;

  constructor(private homeService:HomeService ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.homeService.getProducts().subscribe((data:HomeModel[]) => {
      this.homeData = data;
    });
  }

}
