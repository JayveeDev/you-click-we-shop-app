import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';

enableProdMode();

import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public customer: CustomerModel;
  private listUrl = 'http://localhost:51816/api/customer/getallcustomers/';
  private postUrl = 'http://localhost:51816/api/customer/insertcustomer';
  private deleteUrl = 'http://localhost:51816/api/customer/deletecustomer/';
  private editUrl = 'http://localhost:51816/api/customer/updatecustomer';
  private getUrl = 'http://localhost:51816/api/customer/getcustomer/';

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  getList(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.listUrl);
  }
  getRecord(id: number): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(this.getUrl+id);
  }
  createRecord(model: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(this.postUrl, model);
  }
  deleteRecord(recordId: number): Observable<CustomerModel>{
    return this.http.delete<CustomerModel>(this.deleteUrl+recordId);
  }
  editRecord(model: CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(this.editUrl, model);
  }
}
