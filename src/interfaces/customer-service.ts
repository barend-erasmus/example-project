import { Customer } from '../models/customer';
import { Query } from '../models/query';

export interface ICustomerService {
    create(customer: Customer): Promise<Customer>;
    find(id: string): Promise<Customer>;
    search(query: Query): Promise<Customer[]>;
}
