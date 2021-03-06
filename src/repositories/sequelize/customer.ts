import { inject, injectable, unmanaged } from 'inversify';
import 'reflect-metadata';
import * as Sequelize from 'sequelize';
import { ICustomerRepository } from '../../interfaces/customer-repository';
import { IQueryBuilder } from '../../interfaces/query-builder';
import { Address } from '../../models/address';
import { ContactInformation } from '../../models/contact-information';
import { Customer } from '../../models/customer';
import { Query } from '../../models/query';
import { BaseRepository } from './base';

@injectable()
export class SQLCustomerRepository extends BaseRepository implements ICustomerRepository {

    constructor(
        @unmanaged()
        protected searchQueryBuilder: IQueryBuilder,
    ) {
        super();
    }

    public async create(customer: Customer): Promise<Customer> {
        const result: any = await BaseRepository.models.Customer.create({
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
        }, {
                include: [
                    {
                        include: [
                            { model: BaseRepository.models.Address },
                        ],
                        model: BaseRepository.models.ContactInformation,
                    },
                ],
            });

        customer.setId(result.id.toString());

        return customer;
    }

    public async find(id: string): Promise<Customer> {
        const result: any = await BaseRepository.models.Customer.find({
            include: [
                {
                    include: [
                        { model: BaseRepository.models.Address },
                    ],
                    model: BaseRepository.models.ContactInformation,
                },
            ],
            where: {
                id: {
                    [Sequelize.Op.eq]: parseInt(id, undefined),
                },
            },
        });

        if (!result) {
            return null;
        }

        return this.dtoToCustomer(result);
    }

    public async search(query: Query): Promise<Customer[]> {
        const result: any[] = await BaseRepository.models.Customer.findAll(this.searchQueryBuilder.build(query));

        return result.map((item) => this.dtoToCustomer(item));
    }

    protected dtoToCustomer(dto: any): Customer {
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
