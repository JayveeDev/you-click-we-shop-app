import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerModel } from '../models/customer.model';
import { DeliveryModel } from '../models/delivery.model';
import { CustomerLoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  model: CustomerModel;
  deliveryModel: DeliveryModel;
  loginModel: CustomerLoginModel;
  submitted : boolean;

  constructor(
    private service: CustomerService,
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router
  ) { }

  ngOnInit() {

    //this.getList();
    this.signupForm = this.formBuilder.group({
      FirstName: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z]+$')
      ])],
      LastName: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z]+$')
      ])],
      EmailAddress: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      Password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      PhoneNo: ['', Validators.compose([
        Validators.maxLength(13),
        Validators.required,
        Validators.pattern('^[0-9+]+$')
      ])],
      Role: ['', Validators.required],
    });
  }

  //Validators
  get FirstName() { return this.signupForm.get('FirstName'); }
  get LastName() { return this.signupForm.get('LastName'); }
  get EmailAddress() { return this.signupForm.get('EmailAddress'); }
  get Password() { return this.signupForm.get('Password'); }
  get PhoneNo() { return this.signupForm.get('PhoneNo'); }
  get Role() { return this.signupForm.get('Role'); }

  public deleteRecord() {
    this.service.deleteRecord(2).subscribe(
      data => {
        console.log("deleted");
      }
    );

  }

  public getList() {

    this.service.getList().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        //on completion

      }

    );

  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      console.log("Invalid");
      return;
    } else {
      //account creation and login for customer account
      if (this.signupForm.controls["Role"].value == "Customer") {

        this.model = ({
          CustomerID: 0,
          FirstName: this.signupForm.controls["FirstName"].value,
          LastName: this.signupForm.controls["LastName"].value,
          Password: this.signupForm.controls["Password"].value,
          EmailAddress: this.signupForm.controls["EmailAddress"].value,
          PhoneNo: this.signupForm.controls["PhoneNo"].value,
          Avatar: ""
        });

        //this.loginModel = ({
        //  EmailAddress: this.signupForm.controls["EmailAddress"].value,
        //  Password: this.signupForm.controls["Password"].value
        //});

        this.service.createRecord(this.model).subscribe(
          data => {
            console.log(this.model);
            this.router.navigate(['/login']);
          },
          err => {
            console.log(err);
          },
          () => {
            //on completion
          }
        );
      }
      else if(this.signupForm.controls["Role"].value == "Delivery") {
        //account creation for delivery man or middle man
        this.deliveryModel = ({
          UserAccountID: 0,
          Avatar: "",
          FirstName: this.signupForm.controls["FirstName"].value,
          LastName: this.signupForm.controls["LastName"].value,
          Role: this.signupForm.controls["Role"].value,
          Username: this.signupForm.controls["EmailAddress"].value,
          Password: this.signupForm.controls["Password"].value,
        });

        console.log(this.deliveryModel);
      }
    }
  }

  async login(loginrequest: CustomerLoginModel) {
    this.loginservice.Login(loginrequest);
  }
}
