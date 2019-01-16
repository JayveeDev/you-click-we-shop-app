import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerModel } from '../models/customer.model';
import { DeliveryModel } from '../models/delivery.model';
import { CustomerLoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalModule, WavesModule, InputsModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild ('signupFrame') public signupModal: any;
  signupForm: FormGroup;
  model: CustomerModel;
  deliveryModel: DeliveryModel;
  loginModel: CustomerLoginModel;

  constructor(
    private service: CustomerService,
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private modal : ModalModule
  ) { }

  ngOnInit() {

    //this.getList();
    this.signupForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailAddress: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      Password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])],
      PhoneNo: ['', Validators.required],
      Role: ['', Validators.required],
    });
  }


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

    if (this.signupForm.invalid) {
      this.showError();
      console.log("invalid");
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
            this.toastr.success('Your account has been successfully registered!', 'Success!');
            console.log(this.model);
            //this.login(this.loginModel);
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




  //toastr after validation
  showError() {
    //Firstname validation message
    for (let validation of this.AccountValidationMessage.firstname) {
      if (this.signupForm.get('FirstName').hasError(validation.type) && (this.signupForm.get('FirstName').dirty || this.signupForm.get('FirstName').touched)) {
        var msg = validation.message;
        this.toastr.warning(msg, 'Please try again!');
      }
    }
    //Lastname validation message
    for (let validation of this.AccountValidationMessage.lastname) {
      if (this.signupForm.get('LastName').hasError(validation.type) && (this.signupForm.get('LastName').dirty || this.signupForm.get('LastName').touched)) {
        var msg = validation.message;
        this.toastr.warning(msg, 'Please try again!');
      }
    }
    //Email validation message
    for (let validation of this.AccountValidationMessage.email) {
      if (this.signupForm.get('EmailAddress').hasError(validation.type) && (this.signupForm.get('EmailAddress').dirty || this.signupForm.get('EmailAddress').touched)) {
        var msg = validation.message;
        this.toastr.warning(msg, 'Please try again!');
      }
    }
    //Password validation message
    for (let validation of this.AccountValidationMessage.password) {
      if (this.signupForm.get('Password').hasError(validation.type) && (this.signupForm.get('Password').dirty || this.signupForm.get('Password').touched)) {
        var msg = validation.message;
        this.toastr.warning(msg, 'Please try again!');
      }
    }
    //Phone validation message
    for (let validation of this.AccountValidationMessage.phone) {
      if (this.signupForm.get('PhoneNo').hasError(validation.type) && (this.signupForm.get('PhoneNo').dirty || this.signupForm.get('PhoneNo').touched)) {
        var msg = validation.message;
        this.toastr.warning(msg, 'Please try again!');
      }
    }
    //Account Type validation message
    for (let validation of this.AccountValidationMessage.role) {
      if (this.signupForm.get('Role').hasError(validation.type) && (this.signupForm.get('Role').dirty || this.signupForm.get('Role').touched)) {
        var msg = validation.message;
        this.toastr.warning(msg, 'Please try again!');
      }
    }
  }



  


  //Validation Message
  AccountValidationMessage = {
    'firstname': [
      { type: 'required', message: 'Please enter your first name' }
    ],
    'lastname': [
      { type: 'required', message: 'Please enter your last name' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'phone': [
      { type: 'required', message: 'Phone number is required' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'role': [
      { type: 'required', message: 'Account type is required' },
    ]
  }

}
