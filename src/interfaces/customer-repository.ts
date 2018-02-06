import { Customer } from '../models/customer';

export interface ICustomerRepository {
    create(customer: Customer): Promise<Customer>;
    find(identificationNumber: string): Promise<Customer>;
}
