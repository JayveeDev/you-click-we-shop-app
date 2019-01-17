import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CustomerModel } from '../models/customer.model';
import { count } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(
    private router: Router,
  ) {}

  login(user: CustomerModel) {
    if (user != undefined) {
      if (user.EmailAddress !== '') {
        this.loggedIn.next(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userId', user.CustomerID.toString());
        this.router.navigate(['/home']);
        //window.location.reload();
      }
  }

  if (user == null || user === undefined) {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    
    }
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
  }
}