import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent {

  categories: string[] = [];

  constructor(private productService: ProductService) {
    this.categories = this.productService.getCategories();
  }

}