import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { Address } from '../models/address';
import { ContactInformation } from '../models/contact-information';
import { Customer } from '../models/customer';
import { CustomerMapper } from './customer';

describe('CustomerMapper', () => {

    describe('map', () => {

        let customerMapper: CustomerMapper = null;

        beforeEach(async () => {
            customerMapper = new CustomerMapper();
        });

        it('should map to correct type', async () => {

            const customer: Customer = customerMapper.map({
                contactInformation: {
                    emailAddress: 'developersworkspace@gmail.com',
                },
            });

            expect(customer instanceof Customer).to.be.true;
        });

        it('should map contact information to correct type', async () => {

            const customer: Customer = customerMapper.map({
                contactInformation: {
                    emailAddress: 'developersworkspace@gmail.com',
                },
            });

            expect(customer.contactInformation instanceof ContactInformation).to.be.true;
        });

        it('should map contact information address to correct type', async () => {

            const customer: Customer = customerMapper.map({
                contactInformation: {
                    address: {
                        city: 'Cape Town',
                    },
                },
            });

            expect(customer.contactInformation.address instanceof Address).to.be.true;
        });

        it('should map contact information email address', async () => {

            const customer: Customer = customerMapper.map({
                contactInformation: {
                    emailAddress: 'developersworkspace@gmail.com',
                },
            });

            expect(customer.contactInformation.emailAddress).to.be.eq('developersworkspace@gmail.com');
        });

        it('should map first name', async () => {

            const customer: Customer = customerMapper.map({
                firstName: 'Barend',
            });

            expect(customer.firstName).to.be.eq('Barend');
        });

        it('should map identification number', async () => {

            const customer: Customer = customerMapper.map({
                identificationNumber: '9605235100085',
            });

            expect(customer.identificationNumber).to.be.eq('9605235100085');
        });

    });

});
