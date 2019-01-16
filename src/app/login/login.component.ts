import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerModel } from '../models/customer.model';
import { CustomerLoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  model: CustomerModel;
  loginModel: CustomerLoginModel;

  constructor(private formBuilder: FormBuilder, private loginservice: LoginService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      EmailAddress: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      Password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
     ])],
      Role: ['', Validators.required]
    });
    this.checkExistingUser();
  }

  checkExistingUser(){
    if(localStorage.getItem('currentUser') != null || localStorage.getItem('currentUser') != null){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/login'])
    }
  }

  onSubmit() {
    //Login for customer
    if (this.loginForm.controls["Role"].value == "Customer") {
      if (this.loginForm.invalid) {
        this.toastr.warning('Please enter valid email and password!','Invalid input!');
        console.log('invalid');
        return;
      }
      else {
        this.loginModel = ({
          EmailAddress: this.loginForm.controls["EmailAddress"].value,
          Password: this.loginForm.controls["Password"].value
        });
        this.login(this.loginModel);
        window.location.reload();
      }
    }
    //Login for Delivery
    else if (this.loginForm.controls["Role"].value == "Delivery") {

    }
    //Login for Admin
    else {

    }



  }

  async login(loginrequest: CustomerLoginModel) {
    this.loginservice.Login(loginrequest);
  }

}
