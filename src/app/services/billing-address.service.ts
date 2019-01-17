import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
enableProdMode();

import { BillingAddress } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class BillingAddressService {

  public billingAddress: BillingAddress;
  private listUrl = 'http://localhost:51816/api/billingaddress/getalladdress/';
  private postUrl = 'http://localhost:51816/api/billingaddress/insertaddress';
  private deleteUrl = 'http://localhost:51816/api/billingaddress/deleteaddress/';
  private editUrl = 'http://localhost:51816/api/billingaddress/updateaddress';
  private getUrl = 'http://localhost:51816/api/billingaddress/getaddress/';

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  getList(): Observable<BillingAddress[]> {
    return this.http.get<BillingAddress[]>(this.listUrl);
  }
  getRecord(id: number): Observable<BillingAddress> {
    return this.http.get<BillingAddress>(this.getUrl + id);
  }
  createRecord(model: BillingAddress): Observable<BillingAddress> {
    return this.http.post<BillingAddress>(this.postUrl, model);
  }
  deleteRecord(recordId: number): Observable<BillingAddress> {
    return this.http.delete<BillingAddress>(this.deleteUrl + recordId);
  }
  editRecord(model: BillingAddress): Observable<BillingAddress> {
    return this.http.put<BillingAddress>(this.editUrl, model);
  }
}
