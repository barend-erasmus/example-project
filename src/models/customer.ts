import { IEntity } from '../interfaces/entity';
import { ContactInformation } from './contact-information';

export class Customer implements IEntity {

    constructor(
        public id: string,
        public contactInformation: ContactInformation,
        public firstName: string,
        public identificationNumber: string,
        public lastName: string,
    ) {

    }

    public contactInformationValid(): boolean {
        return this.contactInformation ? this.contactInformation.valid() : false;
    }

    public firstNameValid(): boolean {
        return this.firstName ? true : false;
    }

    public identificationNumberValid(): boolean {
        return this.identificationNumber ? true : false;
    }

    public lastNameValid(): boolean {
        return this.lastName ? true : false;
    }

    public valid(): boolean {
        if (this.contactInformationValid() && this.identificationNumberValid() && this.lastNameValid()) {
            return true;
        }

        return false;
    }
}
