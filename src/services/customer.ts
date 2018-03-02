import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ExampleProjectError } from '../errors/example-project-error';
import { ICustomerRepository } from '../interfaces/customer-repository';
import { ICustomerService } from '../interfaces/customer-service';
import { Customer } from '../models/customer';

@injectable()
export class CustomerService implements ICustomerService {
    constructor(
        @inject('ICustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {

    }

    public async create(customer: Customer): Promise<Customer> {
        await this.throwIfCustomerExist(customer.identificationNumber);

        customer = await this.customerRepository.create(customer);

        return customer;
    }

    public async find(identificationNumber: string): Promise<Customer> {
        const customer: Customer = await this.customerRepository.find(identificationNumber);

        return customer;
    }

    private async throwIfCustomerExist(identificationNumber: string): Promise<void> {
        const existingCustomer: Customer = await this.customerRepository.find(identificationNumber);

        if (existingCustomer) {
            throw new ExampleProjectError('existing_customer', `Customer already exist with identification number '${identificationNumber}'`);
        }

    }
}
