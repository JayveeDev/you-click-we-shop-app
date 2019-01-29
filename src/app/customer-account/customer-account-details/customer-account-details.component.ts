import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { BillingAddressService } from '../../services/billing-address.service'
import { CustomerModel } from '../../models/customer.model';
import { BillingAddress } from '../../models/address.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-account-details',
  templateUrl: './customer-account-details.component.html',
  styleUrls: ['./customer-account-details.component.scss']
})
export class CustomerAccountDetailsComponent implements OnInit {


  private sub: any;
  private addressEditMode: boolean;
  private id: number;
  private addressId: number;
  private model: CustomerModel;
  private addressModel: BillingAddress;
  private ManageAccountForm: FormGroup;
  private avatar: string;
  private base64textString: string;
  private base64Prefix: string = "data:image/jpeg;base64,";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService,
    private billingService: BillingAddressService,
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
      PhoneNo: ['', Validators.required],
      AddressLine1: ['', Validators.required],
      AddressLine2: [''],
      City: ['', Validators.required],
      Province: ['', Validators.required],
      Zip: ['', Validators.required],
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
    this.base64textString = this.base64Prefix + btoa(binaryString);
    this.avatar = this.base64textString;
    //console.log(this.base64textString);
  }

  getBillingAddress() {
    this.billingService.getRecord(this.id).subscribe(
      data => {
        if (data != null) {
          this.addressId = data.AddressID;
          this.ManageAccountForm.controls["AddressLine1"].setValue(data.AddressLine1);
          this.ManageAccountForm.controls["AddressLine2"].setValue(data.AddressLine2);
          this.ManageAccountForm.controls["City"].setValue(data.City);
          this.ManageAccountForm.controls["Province"].setValue(data.Province);
          this.ManageAccountForm.controls["Zip"].setValue(data.Zip);
        }
      }
    );
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
        this.getBillingAddress();
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
    }
    else
    {
      this.model = ({
        CustomerID: this.id,
        FirstName: this.ManageAccountForm.controls["FirstName"].value,
        LastName: this.ManageAccountForm.controls["LastName"].value,
        Password: this.ManageAccountForm.controls["Password"].value,
        EmailAddress: this.ManageAccountForm.controls["EmailAddress"].value,
        PhoneNo: this.ManageAccountForm.controls["PhoneNo"].value,
        Avatar: this.avatar
      });

      //checking if there is existing address for the customer
      //if true edit else create new address
      if(this.addressId == null || this.addressId == undefined){
        this.addressId = 0;
        this.addressEditMode = false;
      }else{
        this.addressEditMode = true;
      }
      
      this.addressModel = ({
        AddressID : this.addressId,
        CustomerID : this.id,
        AddressLine1 : this.ManageAccountForm.controls["AddressLine1"].value,
        AddressLine2 : this.ManageAccountForm.controls["AddressLine2"].value,
        City : this.ManageAccountForm.controls["City"].value,
        Province : this.ManageAccountForm.controls["Province"].value,
        Zip : this.ManageAccountForm.controls["Zip"].value
      });
      
      this.service.editRecord(this.model).subscribe(
        data => {
          console.log('Record successfully edited!');
          
        },
        err => {
          console.log(err);
        },
        () => {
          //console.log(this.addressId);
          //console.log(this.addressEditMode);
          if(this.addressEditMode == true){
            this.billingService.editRecord(this.addressModel).subscribe(
              data => {
                console.log('Address successfully edited!');
              },
              err => {
                console.log(err)
              }
            )
          }
          else if(this.addressEditMode == false){
            this.billingService.createRecord(this.addressModel).subscribe(
              data => {
                console.log('Address successfully added!');
              },
              err => {
                console.log(err)
              }
            )
          }
          //go back to homepage after successful editing
          this.router.navigate(['/home'], { relativeTo: this.route });
        }
      );
    }
  }
}
