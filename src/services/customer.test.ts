import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { ICustomerRepository } from '../interfaces/customer-repository';
import { Customer } from '../models/customer';
import { Query } from '../models/query';
import { CustomerService } from './customer';

describe('CustomerService', () => {

    describe('create', () => {

        let customerRepository: ICustomerRepository = null;

        let customerService: CustomerService = null;

        beforeEach(async () => {
            customerRepository = {
                create: (customer: Customer) => Promise.resolve(null),
                search: (query: Query) => Promise.resolve([]),
            } as ICustomerRepository;

            customerService = new CustomerService(customerRepository);
        });

        it('should throw exception given invalid customer', async () => {

            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customer, 'valid').returns(false);

            try {

                await customerService.create(customer);

                throw new Error('Expected Exception');
            } catch (err) {
                expect(err.code).to.be.eq('invalid_customer');
            }
        });

        it('should not throw exception given valid customer', async () => {

            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customer, 'valid').returns(true);

            await customerService.create(customer);
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

            try {

                await customerService.create(customer);

                throw new Error('Expected Exception');
            } catch (err) {
                expect(err.code).to.be.eq('invalid_customer');
                expect(customerRepositoryCreateSpy.notCalled).to.be.true;
            }
        });

        it('should throw exception given identification number already exists', async () => {

            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customer, 'valid').returns(true);
            sinon.stub(customerRepository, 'search').returns([new Customer(null, null, null, null, null)]);

            try {

                await customerService.create(customer);

                throw new Error('Expected Exception');
            } catch (err) {
                expect(err.code).to.be.eq('existing_customer');
            }
        });

        it('should not call create in repository given identification number already exists', async () => {

            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customer, 'valid').returns(true);

            sinon.stub(customerRepository, 'search').returns([new Customer(null, null, null, null, null)]);
            const customerRepositoryCreateSpy = sinon.stub(customerRepository, 'create').returns(null);

            try {

                await customerService.create(customer);

                throw new Error('Expected Exception');
            } catch (err) {
                expect(err.code).to.be.eq('existing_customer');
                expect(customerRepositoryCreateSpy.notCalled).to.be.true;
            }
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

        it('should throw exception given null id', async () => {

            try {

                await customerService.find(null);

                throw new Error('Expected Exception');
            } catch (err) {
                expect(err.code).to.be.eq('invalid_customer_id');
            }
        });

        it('should not throw exception given valid customer id', async () => {
            await customerService.find('1');
        });

        it('should call find in repository given valid customer id', async () => {

            const customerRepositoryFindSpy = sinon.stub(customerRepository, 'find').returns(null);

            await customerService.find('1');

            expect(customerRepositoryFindSpy.calledOnce).to.be.true;

        });

        it('should not call find in repository given invalid customer id', async () => {

            const customerRepositoryFindSpy = sinon.stub(customerRepository, 'find').returns(null);

            try {

                await customerService.find(null);

                throw new Error('Expected Exception');
            } catch (err) {
                expect(err.code).to.be.eq('invalid_customer_id');
                expect(customerRepositoryFindSpy.notCalled).to.be.true;
            }
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

        it('should throw exception given null query', async () => {

            try {

                await customerService.search(null);

                throw new Error('Expected Exception');
            } catch (err) {
                expect(err.code).to.be.eq('invalid_query');
            }
        });

        it('should not throw exception given valid query', async () => {
            await customerService.search(new Query(null, null, null, null, null, null));
        });

        it('should call search in repository given valid query', async () => {

            const customerRepositorySearchSpy = sinon.stub(customerRepository, 'search').returns(null);

            await customerService.search(new Query(null, null, null, null, null, null));

            expect(customerRepositorySearchSpy.calledOnce).to.be.true;

        });

        it('should not call search in repository given invalid query', async () => {

            const customerRepositorySearchSpy = sinon.stub(customerRepository, 'search').returns(null);

            try {

                await customerService.search(null);

                throw new Error('Expected Exception');
            } catch (err) {
                expect(err.code).to.be.eq('invalid_query');
                expect(customerRepositorySearchSpy.notCalled).to.be.true;
            }
        });

    });
});
