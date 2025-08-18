import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRequest, UserService } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true
})
export class Register {

  user: RegisterRequest = {
    name: '',
    email: '',
    password: ''
  };
  message: string = '';
  success: boolean = false;

  constructor(private userService: UserService, private router:Router) { }

  onSubmit() {
    this.userService.register(this.user).subscribe({
      next: (res:any) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        this.message = 'Registration successful!';
        this.success = true;
        this.user = {
          name: '',
          email: '',
          password: ''
        };
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }

 
}