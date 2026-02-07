import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    // Electronics
    { id: 1, name: 'Laptop', price: 60000, image: 'https://via.placeholder.com/200', category: 'electronics' },
    { id: 2, name: 'Mobile', price: 20000, image: 'https://via.placeholder.com/200', category: 'electronics' },
    { id: 3, name: 'Headphones', price: 3000, image: 'https://via.placeholder.com/200', category: 'electronics' },
    { id: 4, name: 'Smart Watch', price: 5000, image: 'https://via.placeholder.com/200', category: 'electronics' },
    { id: 5, name: 'Keyboard', price: 1500, image: 'https://via.placeholder.com/200', category: 'electronics' },

    // Clothing
    { id: 6, name: 'T-Shirt', price: 800, image: 'https://via.placeholder.com/200', category: 'clothing' },
    { id: 7, name: 'Jeans', price: 1500, image: 'https://via.placeholder.com/200', category: 'clothing' },
    { id: 8, name: 'Jacket', price: 2500, image: 'https://via.placeholder.com/200', category: 'clothing' },
    { id: 9, name: 'Sneakers', price: 3000, image: 'https://via.placeholder.com/200', category: 'clothing' },
    { id: 10, name: 'Cap', price: 500, image: 'https://via.placeholder.com/200', category: 'clothing' },

    // Books
    { id: 11, name: 'Novel', price: 400, image: 'https://via.placeholder.com/200', category: 'books' },
    { id: 12, name: 'Comics', price: 300, image: 'https://via.placeholder.com/200', category: 'books' },
    { id: 13, name: 'Biography', price: 600, image: 'https://via.placeholder.com/200', category: 'books' },
    { id: 14, name: 'Self Help', price: 350, image: 'https://via.placeholder.com/200', category: 'books' },
    { id: 15, name: 'Science Book', price: 700, image: 'https://via.placeholder.com/200', category: 'books' }
  ];

  getCategories() {
    return [...new Set(this.products.map(p => p.category))];
  }

  getProductsByCategory(category: string) {
    return this.products.filter(p => p.category === category);
  }

}