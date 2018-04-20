import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { ICustomerRepository } from '../interfaces/customer-repository';
import { Customer } from '../models/customer';
import { OperationResult } from '../models/operation-result';
import { Query } from '../models/query';
import { CustomerService } from './customer';

describe('CustomerService', () => {

    describe('create', () => {

        let customerRepository: ICustomerRepository = null;

        let customerService: CustomerService = null;

        beforeEach(async () => {
            customerRepository = {
                create: async (customer: Customer) => {
                    return customer;
                },
                search: async (query: Query) => {
                    return [];
                },
            } as ICustomerRepository;

            customerService = new CustomerService(customerRepository);
        });

        it('should return with validation messages given invalid customer', async () => {
            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customer, 'valid').returns(false);

            const result: OperationResult<Customer> = await customerService.create(customer);

            expect(result.messages[0].message).to.be.eq('Invalid Customer');
        });

        it('should call create in repository given valid customer', async () => {
            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customer, 'valid').returns(true);

            const customerRepositoryCreateSpy = sinon.stub(customerRepository, 'create').returns(null);

            await customerService.create(customer);

            expect(customerRepositoryCreateSpy.calledOnce).to.be.true;
        });

        it('should not call create in repository given invalid customer', async () => {
            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customer, 'valid').returns(false);

            const customerRepositoryCreateSpy = sinon.stub(customerRepository, 'create').returns(null);

            await customerService.create(customer);
            expect(customerRepositoryCreateSpy.notCalled).to.be.true;
        });

        it('should return with validation messages given identification number already exists', async () => {
            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customer, 'valid').returns(true);
            sinon.stub(customerRepository, 'search').returns([new Customer(null, null, null, null, null)]);

            const result: OperationResult<Customer> = await customerService.create(customer);

            expect(result.messages[0].message).to.be.eq(`Customer already exist with identification number 'null'`);
        });

        it('should not call create in repository given identification number already exists', async () => {
            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customer, 'valid').returns(true);

            sinon.stub(customerRepository, 'search').returns([new Customer(null, null, null, null, null)]);
            const customerRepositoryCreateSpy = sinon.stub(customerRepository, 'create').returns(null);

            await customerService.create(customer);

            expect(customerRepositoryCreateSpy.notCalled).to.be.true;
        });

    });

    describe('find', () => {

        let customerRepository: ICustomerRepository = null;

        let customerService: CustomerService = null;

        beforeEach(async () => {
            customerRepository = {
                find: (id: string) => Promise.resolve(null),
            } as ICustomerRepository;

            customerService = new CustomerService(customerRepository);
        });

        it('should return with validation messages given null id', async () => {
            const result: OperationResult<Customer> = await customerService.find(null);

            expect(result.messages[0].message).to.be.eq('Invalid Customer Id');
        });

        it('should call find in repository given valid customer id', async () => {
            const customerRepositoryFindSpy = sinon.stub(customerRepository, 'find').returns(null);

            await customerService.find('1');

            expect(customerRepositoryFindSpy.calledOnce).to.be.true;
        });

        it('should not call find in repository given invalid customer id', async () => {
            const customerRepositoryFindSpy = sinon.stub(customerRepository, 'find').returns(null);

            await customerService.find(null);

            expect(customerRepositoryFindSpy.notCalled).to.be.true;
        });

    });

    describe('search', () => {

        let customerRepository: ICustomerRepository = null;

        let customerService: CustomerService = null;

        beforeEach(async () => {
            customerRepository = {
                search: (query: Query) => Promise.resolve(null),
            } as ICustomerRepository;

            customerService = new CustomerService(customerRepository);
        });

        it('should return with validation messages given null query', async () => {
            const result: OperationResult<Customer[]> = await customerService.search(null);

            expect(result.messages[0].message).to.be.eq('Invalid Query');
        });

        it('should call search in repository given valid query', async () => {
            const customerRepositorySearchSpy = sinon.stub(customerRepository, 'search').returns(null);

            await customerService.search(new Query(null, null, null, null, null, null));

            expect(customerRepositorySearchSpy.calledOnce).to.be.true;
        });

        it('should not call search in repository given invalid query', async () => {
            const customerRepositorySearchSpy = sinon.stub(customerRepository, 'search').returns(null);

            await customerService.search(null);

            expect(customerRepositorySearchSpy.notCalled).to.be.true;
        });

    });

});
