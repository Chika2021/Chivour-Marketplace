import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginRequest, LoginService } from './service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  user:loginRequest = {
    email: "",
    password: ""
    
  }

  constructor(private loginService:LoginService, private router:Router){}

  onSubmit() {
    this.loginService.login(this.user).subscribe({
      next(res:any) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
       
      }
    
    })
    this.router.navigate(['/dashboard'])
  }

}
