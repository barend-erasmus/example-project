import 'reflect-metadata';
import { injectable, inject, unmanaged } from 'inversify';
import * as mongodb from 'mongodb';
import { BaseRepository } from './base';
import { ICustomerRepository } from '../../interfaces/customer-repository';
import { IQueryBuilder } from '../../interfaces/query-builder';
import { Customer } from '../../models/customer';
import { ContactInformation } from '../../models/contact-information';
import { Address } from '../../models/address';
import { Query } from '../../models/query';

@injectable()
export class MongoCustomerRepository extends BaseRepository implements ICustomerRepository {

    constructor(
        @unmanaged()
        private searchQueryBuilder: IQueryBuilder,
        uri: string,
    ) {
        super(uri);
    }

    public async create(customer: Customer): Promise<Customer> {

        const newCustomer = new this.models.Customer({
            _id: new mongodb.ObjectID(),
            contactInformation: {
                address: {
                    city: customer.contactInformation.address.city,
                    country: customer.contactInformation.address.country,
                    line1: customer.contactInformation.address.line1,
                    line2: customer.contactInformation.address.line2,
                    postalCode: customer.contactInformation.address.postalCode,
                },
                emailAddress: customer.contactInformation.emailAddress,
                phoneNumber: customer.contactInformation.phoneNumber,
            },
            firstName: customer.firstName,
            identificationNumber: customer.identificationNumber,
            lastName: customer.lastName,
        });

        const result = await newCustomer.save();

        customer.setId(result._id.toString());

        return customer;
    }

    public async find(id: string): Promise<Customer> {
        const result: any = await this.models.Customer.findOne({
            _id: id,
        });

        if (!result) {
            return null;
        }

        return this.dtoToCustomer(result);
    }

    public async search(query: Query): Promise<Customer[]> {
        const result: any[] = await this.models.Customer.find(this.searchQueryBuilder.build(query));

        return result.map((item) => this.dtoToCustomer(item));
    }

    private dtoToCustomer(dto: any): Customer {
        return new Customer(dto._id, new ContactInformation(
            new Address(
                dto.contactInformation.address.city,
                dto.contactInformation.address.country,
                dto.contactInformation.address.line1,
                dto.contactInformation.address.line2,
                dto.contactInformation.address.postalCode,
            ),
            dto.contactInformation.emailAddress,
            dto.contactInformation.phoneNumber,
        ),
            dto.firstName,
            dto.identificationNumber,
            dto.lastName);
    }
}
