import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, RegisterComponent, LoginComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  user: any = null;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

ngOnInit() {
  if (!this.isBrowser) {
    return;
  }

  const storedUser = localStorage.getItem('authData');
  if (storedUser) {
    this.user = JSON.parse(storedUser);
  }
}

isLoggedIn(): boolean {
  return this.isBrowser && !!localStorage.getItem('token');
}

isAdmin(): boolean {
  const user = JSON.parse(localStorage.getItem('authData') || '{}');
  return user?.isAdmin === true;
}

    toOrders(){
        window.location.href = '/orders'
    }
    
    toSales(){
        window.location.href = '/sales'
    }

    toStore(){
        window.location.href = '/store'
    }

    toSignups(){
        window.location.href = '/signups'
    }

    toUsers(){
        window.location.href = '/users'
    }

logout() {
  if (!this.isBrowser) {
    return;
  }


  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('authData');

  window.location.href = '/auth/login';
}

}
