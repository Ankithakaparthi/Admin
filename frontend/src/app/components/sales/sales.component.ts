import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {

  orders: any[] = [];
  totalSalesAmount = 0;
  loading = true;

  productsChart!: Chart;
  salesChart!: Chart;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchSales();
  }

  fetchSales() {

    if (!isPlatformBrowser(this.platformId)) return;

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Admin token not found');
      return;
    }

    this.http.post<any[]>(
      'http://localhost:3001/admin/getAllSales',
      { token }
    ).subscribe({
      next: (data) => {

        this.orders = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        this.calculateTotal();
        this.loading = false;

        setTimeout(() => {
          this.generateCharts();
        }, 0);

        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch sales', err);
        this.loading = false;
      }
    });
  }

  calculateTotal() {
    this.totalSalesAmount = 0;

    this.orders.forEach(order => {
      this.totalSalesAmount += order.totalPrice;
    });
  }

  generateCharts() {

    const today = new Date();

    const labels: string[] = [];
    const productsMap: Record<string, number> = {};
    const amountMap: Record<string, number> = {};

    for (let i = 6; i >= 0; i--) {

      const d = new Date();
      d.setDate(today.getDate() - i);

      const key = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('en-IN', { weekday: 'short' });

      labels.push(label);
      productsMap[key] = 0;
      amountMap[key] = 0;
    }

    this.orders.forEach(order => {

      const orderDate = new Date(order.createdAt)
        .toISOString()
        .split('T')[0];

      if (productsMap[orderDate] !== undefined) {

        productsMap[orderDate] += order.quantity || 1;
        amountMap[orderDate] += order.totalPrice || 0;
      }
    });

    const productsData = Object.values(productsMap);
    const amountData = Object.values(amountMap);

    this.createProductsChart(labels, productsData);
    this.createSalesChart(labels, amountData);

    console.log(productsData, productsMap)
  }

  createProductsChart(labels: string[], data: number[]) {

  const canvas = document.getElementById('productsChart') as HTMLCanvasElement;

  if (!canvas) return;

  if (this.productsChart) this.productsChart.destroy();

  this.productsChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Products Sold',
          data
        }
      ]
    }
  });
}

  createSalesChart(labels: string[], data: number[]) {

  const canvas = document.getElementById('salesChart') as HTMLCanvasElement;

  if (!canvas) return;

  if (this.salesChart) this.salesChart.destroy();

  this.salesChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Sales Amount (₹)',
          data
        }
      ]
    }
  });
}
 
}