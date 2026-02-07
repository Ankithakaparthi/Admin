import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signups.component.html',
  styleUrl: './signups.component.css'
})
export class SignupsComponent implements OnInit {

  users: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Admin token missing');
      return;
    }

    this.http.post<any[]>(
      'http://localhost:3001/admin/getAllUsers',
      { token }
    ).subscribe({
      next: (data) => {

        this.users = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
        this.loading = false;
      }
    });
  }

}