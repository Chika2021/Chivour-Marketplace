import { Component, OnInit } from '@angular/core';
import { UserService } from '../register/user';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  user:any = null
  constructor( private storage: StorageService) { }

  ngOnInit(): void {
    this.user = this.storage.get('user');
  }

  // Additional methods and properties can be added as needed

}
