import { Injectable } from '@angular/core';
@Injectable()

export class ApiConstUrl {
    public AddCustomer: string;
    public ListCustomerUrl: string;
    public GetCustomerUrl: string;
    public UpdateCustomer: string;
    public DeleteCustomer: string;

    constructor(){
        this.AddCustomer = 'http://localhost:51816/api/customer/insertcustomer';
        this.ListCustomerUrl = 'http://localhost:51816/api/customer/getallcustomers/';
        this.GetCustomerUrl = 'http://localhost:51816/api/customer/getcustomer/';
        this.DeleteCustomer = 'http://localhost:51816/api/customer/deletecustomer/';
        this.UpdateCustomer = 'http://localhost:51816/api/customer/updatecustomer';
        
    }
}