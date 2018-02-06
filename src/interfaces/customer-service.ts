import { Customer } from '../models/customer';

export interface ICustomerService {
    create(customer: Customer): Promise<Customer>;
    find(identificationNumber: string): Promise<Customer>;
}
