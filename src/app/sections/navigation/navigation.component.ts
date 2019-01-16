import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  id: number;
  username: string;
  cartItem: string;
  avatar: string;
  counter: number;
  isAccountValid: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private accountService: CustomerService
  ) { }

  ngOnInit() {
    this.checkAccount();
    this.id = parseInt(localStorage.getItem("userId"));
    this.getRecord();
  }
  
  

  public checkAccount() {
    if (localStorage.getItem('currentUser') == null) {
      this.username = 'Account';
      this.isAccountValid = false;
    } else {
      this.isAccountValid = true;
    }

  }

  getRecord(){
    this.accountService.getRecord(this.id).subscribe(
      data => {
        this.username = data.EmailAddress;
        this.avatar = data.Avatar;
      },
      err => {
        console.log(err);
      },
      () => {
        //on completion
      }

    );
  }

  public manageAccount(){
    var id = localStorage.getItem('userId');
    this.router.navigate(['/home/account', id]);
  }

  public manageCart(){
    var id = localStorage.getItem('userId');
    this.router.navigate(['/home/cart', id]);
  }

  logout() {
    this.loginService.Logout();
    this.checkAccount();
    this.router.navigate(['/login']);
  }



}


