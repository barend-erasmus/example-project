import { inject, injectable, unmanaged } from 'inversify';
import 'reflect-metadata';
import * as Sequelize from 'sequelize';
import { IQueryBuilder } from '../interfaces/query-builder';
import { Query } from '../models/query';
import { BaseRepository } from '../repositories/sequelize/base';

@injectable()
export class SQLSearchQueryBuilder implements IQueryBuilder {

    public build(query: Query): any {
        let result: any = {
            include: [
                {
                    include: [
                        {
                            model: BaseRepository.models.Address,
                            where: {

                            },
                        },
                    ],
                    model: BaseRepository.models.ContactInformation,
                    where: {

                    },
                },
            ],
            where: {

            },
        };

        result = this.setCity(query.city, result);

        result = this.setEmailAddress(query.emailAddress, result);

        result = this.setFirstName(query.firstName, result);

        result = this.setIdentificationNumber(query.identificationNumber, result);

        result = this.setLastName(query.lastName, result);

        result = this.setPhoneNumber(query.phoneNumber, result);

        return result;
    }

    protected setCity(city: string, result: any): any {
        if (!city) {
            return result;
        }

        result.include[0].include[0].where.city = {
            [Sequelize.Op.eq]: city,
        };

        return result;
    }

    protected setEmailAddress(emailAddress: string, result: any): any {
        if (!emailAddress) {
            return result;
        }

        result.include[0].where.emailAddress = {
            [Sequelize.Op.eq]: emailAddress,
        };

        return result;
    }

    protected setFirstName(firstName: string, result: any): any {
        if (!firstName) {
            return result;
        }

        result.where.firstName = {
            [Sequelize.Op.eq]: firstName,
        };

        return result;
    }

    protected setIdentificationNumber(identificationNumber: string, result: any): any {
        if (!identificationNumber) {
            return result;
        }

        result.where.identificationNumber = {
            [Sequelize.Op.eq]: identificationNumber,
        };

        return result;
    }

    protected setLastName(lastName: string, result: any): any {
        if (!lastName) {
            return result;
        }

        result.where.lastName = {
            [Sequelize.Op.eq]: lastName,
        };

        return result;
    }

    protected setPhoneNumber(phoneNumber: string, result: any): any {
        if (!phoneNumber) {
            return result;
        }

        result.include[0].where.phoneNumber = {
            [Sequelize.Op.eq]: phoneNumber,
        };

        return result;
    }

}
