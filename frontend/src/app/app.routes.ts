import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './components/store/category-list/category-list.component';
import { ProductListComponent } from './components/store/product-list/product-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SalesComponent } from './components/sales/sales.component';
import { SignupsComponent } from './components/signups/signups.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'store', component: CategoryListComponent },
    { path: 'store/:category', component: ProductListComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'signups', component: SignupsComponent },
    { path: 'users', component: UsersComponent },
];