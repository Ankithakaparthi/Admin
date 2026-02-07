import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {

    if (!isPlatformBrowser(this.platformId)) return;

    const token = localStorage.getItem("token");

    this.http.post<any[]>(
      "http://localhost:3001/admin/getAllUsers",
      { token }
    ).subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error(err)
    });

  }
}