import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Customer } from './models/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public customers: Customer[] = [];

  public findExistingCustomerFound: boolean = null;

  public findExistingCustomerIdentificationNumber: string = null;

  public searchIdentificationNumber: string = null;

  constructor(protected http: HttpClient) {
    this.loadCustomers();
  }

  public onClickFindExistingCustomer(): void {
    this.http
      .get<Customer[]>(`http://localhost:3000/api/customer/search?identificationNumber=${this.findExistingCustomerIdentificationNumber}`)
      .subscribe((customers: Customer[]) => {
        this.findExistingCustomerFound = customers.length > 0;
      });
  }

  public onClickSearchListCustomers(): void {
    this.loadCustomers();
  }

  protected loadCustomers(): void {
    this.http
      .get<Customer[]>(`http://localhost:3000/api/customer/search${this.searchIdentificationNumber ?
        `?identificationNumber=${this.searchIdentificationNumber}` : ``}`)
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
      });
  }

}
