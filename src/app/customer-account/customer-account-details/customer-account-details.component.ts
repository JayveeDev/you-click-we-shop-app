import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerModel } from '../../models/customer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-account-details',
  templateUrl: './customer-account-details.component.html',
  styleUrls: ['./customer-account-details.component.scss']
})
export class CustomerAccountDetailsComponent implements OnInit {


  private sub: any;
  private id: number;
  private model: CustomerModel;
  private ManageAccountForm: FormGroup;
  private avatar: string;
  private base64textString: string;
  private base64Prefix: string = "data:image/jpeg;base64,";

  constructor(
    private route: ActivatedRoute,
    private service: CustomerService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (this.id > 0)
        this.getRecord();
      else
        console.log('failed');
    });


    this.ManageAccountForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      EmailAddress: [''],
      Password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])],
      PhoneNo: ['', Validators.required]
    });
  }



  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = this.base64Prefix+btoa(binaryString);
    this.avatar = this.base64textString;
    //console.log(this.base64textString);
  }

  getRecord() {
    this.service.getRecord(this.id).subscribe(
      data => {
        this.avatar = data.Avatar;
        this.ManageAccountForm.controls["FirstName"].setValue(data.FirstName);
        this.ManageAccountForm.controls["LastName"].setValue(data.LastName);
        this.ManageAccountForm.controls["EmailAddress"].setValue(data.EmailAddress);
        this.ManageAccountForm.controls["Password"].setValue(data.Password);
        this.ManageAccountForm.controls["PhoneNo"].setValue(data.PhoneNo);
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

    if (this.ManageAccountForm.invalid) {
      console.log('invalid');
      return;
    } else {
      this.model = ({
        CustomerID: this.id,
        FirstName: this.ManageAccountForm.controls["FirstName"].value,
        LastName: this.ManageAccountForm.controls["LastName"].value,
        Password: this.ManageAccountForm.controls["Password"].value,
        EmailAddress: this.ManageAccountForm.controls["EmailAddress"].value,
        PhoneNo: this.ManageAccountForm.controls["PhoneNo"].value,
        Avatar: this.avatar
      });

      this.service.editRecord(this.model).subscribe(
        data => {
          
        },
        err => {
          console.log(err);
        },
        () => {
          //on completion
        }

      );
    }

  }
}
