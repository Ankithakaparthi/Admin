import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
  this.http.post('http://localhost:3001/api/auth/register', {email: this.user.email, password: this.user.password, name: this.user.name})
    .subscribe({
      next: (response: any) => {

        console.log('Register Success:', response);

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
        console.error('Register Failed', err);
      }
    });
}}