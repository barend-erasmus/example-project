import { inject, injectable, unmanaged } from 'inversify';
import 'reflect-metadata';
import { IQueryBuilder } from '../interfaces/query-builder';
import { Query } from '../models/query';

@injectable()
export class MongoSearchQueryBuilder implements IQueryBuilder {

    public build(query: Query): any {
        let result: any = {};

        result = this.setCity(query.city, result);

        result = this.setEmailAddress(query.emailAddress, result);

        result = this.setFirstName(query.firstName, result);

        result = this.setIdentificationNumber(query.identificationNumber, result);

        result = this.setLastName(query.lastName, result);

        result = this.setPhoneNumber(query.phoneNumber, result);

        return result;
    }

    private setCity(city: string, result: any): any {

        if (!city) {
            return result;
        }

        result['contactInformation.address.city'] = city;

        return result;
    }

    private setEmailAddress(emailAddress: string, result: any): any {

        if (!emailAddress) {
            return result;
        }

        result['contactInformation.emailAddress'] = emailAddress;

        return result;
    }

    private setFirstName(firstName: string, result: any): any {

        if (!firstName) {
            return result;
        }

        result['firstName'] = firstName;

        return result;
    }

    private setIdentificationNumber(identificationNumber: string, result: any): any {

        if (!identificationNumber) {
            return result;
        }

        result['identificationNumber'] = identificationNumber;

        return result;
    }

    private setLastName(lastName: string, result: any): any {

        if (!lastName) {
            return result;
        }

        result['lastName'] = lastName;

        return result;
    }

    private setPhoneNumber(phoneNumber: string, result: any): any {

        if (!phoneNumber) {
            return result;
        }

        result['contactInformation.phoneNumber'] = phoneNumber;

        return result;
    }
}
