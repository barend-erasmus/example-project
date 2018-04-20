import { Customer } from '../models/customer';
import { Query } from '../models/query';

export interface ICustomerRepository {

    create(customer: Customer): Promise<Customer>;
    find(id: string): Promise<Customer>;
    search(query: Query): Promise<Customer[]>;

}
