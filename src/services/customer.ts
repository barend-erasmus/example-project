import { ICustomerRepository } from '../interfaces/customer-repository';
import { ICustomerService } from '../interfaces/customer-service';
import { Customer } from '../models/customer';
import { Query } from '../models/query';

export class CustomerService implements ICustomerService {
    constructor(private customerRepository: ICustomerRepository) {

    }

    public async create(customer: Customer): Promise<Customer> {
        if (!customer.valid()) {
            throw new Error('Invalid Customer');
        }

        const existingCustomers: Customer[] = await this.customerRepository.search(new Query(null, null, null, customer.identificationNumber, null, null));

        if (existingCustomers.length > 0) {
            throw new Error('Existing Customer');
        }

        return this.customerRepository.create(customer);
    }

    public async find(id: string): Promise<Customer> {

        if (!id) {
            throw new Error('Invalid Customer Id');
        }

        return this.customerRepository.find(id);
    }

    public async search(query: Query): Promise<Customer[]> {
        if (!query) {
            throw new Error('Invalid Query');
        }

        return this.customerRepository.search(query);
    }
}
