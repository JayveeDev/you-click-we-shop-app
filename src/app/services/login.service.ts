import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { CustomerLoginModel } from '../models/login.model';
enableProdMode();

import { Injectable, NgModule } from '@angular/core';
import { CustomerModel } from '../models/customer.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public users: CustomerLoginModel;
  public routers: Router;

  constructor(private http: HttpClient, public sanitizer: DomSanitizer, private router: Router, private authService: AuthService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() { }

  public async Login(login: CustomerLoginModel) {
    this.users = null;
    const stringed = JSON.stringify(login);
    try {
      const users = await this.http.get<CustomerModel>('http://localhost:51816/api/customer/login/actions?email=' + login.EmailAddress + '&password=' + login.Password).toPromise<CustomerModel>();
      this.users = users;
      if (users != null) {
        this.authService.login(users);
      }
    } catch (error) {
      //unsuccessful login
      console.log(error);
    }
  }

  public Logout(){
    this.authService.logout();
  }
}
