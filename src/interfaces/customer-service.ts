import { Customer } from '../models/customer';
import { OperationResult } from '../models/operation-result';
import { Query } from '../models/query';

export interface ICustomerService {

    create(customer: Customer): Promise<OperationResult<Customer>>;
    find(id: string): Promise<OperationResult<Customer>>;
    search(query: Query): Promise<OperationResult<Customer[]>>;

}
