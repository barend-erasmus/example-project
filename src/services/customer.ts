import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ExampleProjectError } from '../errors/example-project-error';
import { ICustomerRepository } from '../interfaces/customer-repository';
import { ICustomerService } from '../interfaces/customer-service';
import { Customer } from '../models/customer';
import { OperationResult } from '../models/operation-result';
import { Query } from '../models/query';

@injectable()
export class CustomerService implements ICustomerService {
    constructor(
        @inject('ICustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {

    }

    public async create(customer: Customer): Promise<OperationResult<Customer>> {
        const result: OperationResult<Customer> = OperationResult.create<Customer>(null);

        this.checkIfCustomerInvalid(customer, result);

        await this.checkIfCustomerExist(customer.identificationNumber, result);

        if (result.hasErrors()) {
            return result;
        }

        customer = await this.customerRepository.create(customer);

        result.setResult(customer);

        return result;
    }

    public async find(id: string): Promise<OperationResult<Customer>> {
        const result: OperationResult<Customer> = OperationResult.create<Customer>(null);

        this.checkIfCustomerIdInvalid(id, result);

        if (result.hasErrors()) {
            return result;
        }

        const customer: Customer = await this.customerRepository.find(id);

        result.setResult(customer);

        return result;
    }

    public async search(query: Query): Promise<OperationResult<Customer[]>> {
        const result: OperationResult<Customer[]> = OperationResult.create<Customer[]>(null);

        this.checkIfQueryNull(query, result);

        if (result.hasErrors()) {
            return result;
        }

        const customers: Customer[] = await this.customerRepository.search(query);

        result.setResult(customers);

        return result;
    }

    private async checkIfCustomerExist(identificationNumber: string, operationResult: OperationResult<Customer>): Promise<void> {
        const existingCustomers: Customer[] = await this.customerRepository.search(new Query(null, null, null, identificationNumber, null, null));

        if (existingCustomers.length > 0) {
            operationResult.addMessage('existing_customer', null, `Customer already exist with identification number '${identificationNumber}'`);
        }

    }

    private checkIfCustomerIdInvalid(id: string, operationResult: OperationResult<Customer>): void {
        if (!id) {
            operationResult.addMessage('invalid_customer_id', null, 'Invalid Customer Id');
        }
    }

    private checkIfCustomerInvalid(customer: Customer, operationResult: OperationResult<Customer>): void {
        if (!customer.valid()) {
            operationResult.addMessage('invalid_customer', null, 'Invalid Customer');
        }
    }

    private checkIfQueryNull(query: Query, operationResult: OperationResult<Customer[]>): void {
        if (!query) {
            operationResult.addMessage('invalid_query', null, 'Invalid Query');
        }
    }
}
