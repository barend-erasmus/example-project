import { IQueryBuilder } from '../interfaces/query-builder';
import { Query } from '../models/query';

export class SearchQueryBuilder implements IQueryBuilder {

    public build(query: Query): any {
        let result: any = {};

        if (query.city) {
            result = this.setCity(query.city, result);
        }

        if (query.emailAddress) {
            result = this.setEmailAddress(query.emailAddress, result);
        }

        if (query.firstName) {
            result = this.setFirstName(query.firstName, result);
        }

        if (query.identificationNumber) {
            result = this.setIdentificationNumber(query.identificationNumber, result);
        }

        if (query.lastName) {
            result = this.setLastName(query.lastName, result);
        }

        if (query.phoneNumber) {
            result = this.setPhoneNumber(query.phoneNumber, result);
        }

        return result;
    }

    private setCity(city: string, result: any): any {

        result['contactInformation.address.city'] = city;

        return result;
    }

    private setEmailAddress(emailAddress: string, result: any): any {

        result['contactInformation.emailAddress'] = emailAddress;

        return result;
    }

    private setFirstName(firstName: string, result: any): any {

        result['firstName'] = firstName;

        return result;
    }

    private setIdentificationNumber(identificationNumber: string, result: any): any {

        result['identificationNumber'] = identificationNumber;

        return result;
    }

    private setLastName(lastName: string, result: any): any {

        result['lastName'] = lastName;

        return result;
    }

    private setPhoneNumber(phoneNumber: string, result: any): any {

        result['contactInformation.pnoneNumber'] = phoneNumber;

        return result;
    }
}
