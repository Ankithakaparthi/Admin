import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {

    const authData = localStorage.getItem('authData');
    const userId = authData ? JSON.parse(authData)._id : null;
    console.log(userId)
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    this.http.post<any[]>(
      `http://localhost:3001/user/getOrders`,
      { userId }
    ).subscribe({
      next: (res) => {
        this.orders = res.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      },
      error: (err) => {
        console.error("Failed to fetch orders", err);
      }
    });
  }
}