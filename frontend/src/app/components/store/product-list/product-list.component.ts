import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {

    products:Product[] = [];
    category = '';
    selected = {}

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private http: HttpClient
    ) {
        this.route.params.subscribe(params => {
        this.category = params['category'];
        this.products = this.productService.getProductsByCategory(this.category);
        });
    }

    selectedMap = new Map<number, number>();

    increaseQty(productId: number) {
        const current = this.selectedMap.get(productId) || 0;
        this.selectedMap.set(productId, current + 1);
    }

    decreaseQty(productId: number) {
        const current = this.selectedMap.get(productId) || 0;

        if (current > 0) {
            this.selectedMap.set(productId, current - 1);
        }
    }

    orderNow(product: any) {

    const qty = this.selectedMap.get(product.id) || 0;

    if (qty === 0) {
        alert('Select quantity first');
        return;
    }

    const user = localStorage.getItem('authData');

    const parsedUser = user ? JSON.parse(user) : null;

    const userId = parsedUser?._id;

    const orderPayload = {
        userId: userId,
        productId: product.id,
        quantity: qty,
        price: product.price,
        totalPrice: product.price*qty
    };

    this.http.post('http://localhost:3001/user/order', orderPayload)
        .subscribe({
        next: (res) => {
            console.log("Order placed", res);
            alert("Order placed successfully");

            this.selectedMap.set(product.id, 0);
        },
        error: (err) => {
            console.error(err);
            alert("Order failed");
        }
        });
    }

}