import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { ICustomerRepository } from '../interfaces/customer-repository';
import { Customer } from '../models/customer';
import { CustomerService } from './customer';

describe('CustomerService', () => {

    describe('create', () => {

        let customerRepository: ICustomerRepository = null;

        let customerService: CustomerService = null;

        beforeEach(async () => {
            customerRepository = {
                create: (customer: Customer) => Promise.resolve(null),
                find: (identificationNumber: string) => Promise.resolve(null),
            } as ICustomerRepository;

            customerService = new CustomerService(customerRepository);
        });

        it('should throw exception given identification number already exists', async () => {

            const customer: Customer = new Customer(null, null, null, null, null);
            sinon.stub(customerRepository, 'find').returns(new Customer(null, null, null, null, null));

            try {

                await customerService.create(customer);

                throw new Error('Expected Exception');
            } catch (err) {
                expect(err.code).to.be.eq('existing_customer');
            }
        });

        it('should not call create in repository given identification number already exists', async () => {

            const customer: Customer = new Customer(null, null, null, null, null);

            sinon.stub(customerRepository, 'find').returns(new Customer(null, null, null, null, null));
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
});
