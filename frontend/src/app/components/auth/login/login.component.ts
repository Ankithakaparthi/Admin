import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
  this.http.post('http://localhost:3001/api/auth/login', this.user)
    .subscribe({
      next: (response: any) => {

        console.log('Login Success:', response);

        localStorage.setItem('authData', JSON.stringify(response));

        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        window.location.href = '/store'
      },
      error: (err) => {
        console.error('Login Failed', err);
      }
    });
  }
}