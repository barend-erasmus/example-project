import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ExampleProjectError } from '../errors/example-project-error';
import { ICustomerRepository } from '../interfaces/customer-repository';
import { ICustomerService } from '../interfaces/customer-service';
import { Customer } from '../models/customer';
import { Query } from '../models/query';

@injectable()
export class CustomerService implements ICustomerService {
    constructor(
        @inject('ICustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {

    }

    public async create(customer: Customer): Promise<Customer> {

        this.throwIfCustomerInvalid(customer);

        await this.throwIfCustomerExist(customer.identificationNumber);

        customer = await this.customerRepository.create(customer);

        return customer;
    }

    public async find(id: string): Promise<Customer> {

        this.throwIfCustomerIdInvalid(id);

        const customer: Customer = await this.customerRepository.find(id);

        return customer;
    }

    public async search(query: Query): Promise<Customer[]> {

        this.throwIfQueryNull(query);

        const customers: Customer[] = await this.customerRepository.search(query);

        return customers;
    }

    private async throwIfCustomerExist(identificationNumber: string): Promise<void> {
        const existingCustomers: Customer[] = await this.customerRepository.search(new Query(null, null, null, identificationNumber, null, null));

        if (existingCustomers.length > 0) {
            throw new ExampleProjectError('existing_customer', `Customer already exist with identification number '${identificationNumber}'`);
        }

    }

    private throwIfCustomerIdInvalid(id: string): void {
        if (!id) {
            throw new ExampleProjectError('invalid_customer_id', 'Invalid Customer Id');
        }
    }

    private throwIfCustomerInvalid(customer: Customer): void {
        if (!customer.valid()) {
            throw new ExampleProjectError('invalid_customer', 'Invalid Customer');
        }
    }

    private throwIfQueryNull(query: Query): void {
        if (!query) {
            throw new ExampleProjectError('invalid_query', 'Invalid Query');
        }
    }
}
