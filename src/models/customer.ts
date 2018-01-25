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

    public setId(id: string): Customer {
        this.id = id;

        return this;
    }

    public valid(): boolean {
        if (this.contactInformationValid() && this.identificationNumberValid() && this.lastNameValid()) {
            return true;
        }

        return false;
    }

    private contactInformationValid(): boolean {
        return this.contactInformation ? this.contactInformation.valid() : false;
    }

    private firstNameValid(): boolean {
        return this.firstName ? true : false;
    }

    private identificationNumberValid(): boolean {
        return this.identificationNumber ? true : false;
    }

    private lastNameValid(): boolean {
        return this.lastName ? true : false;
    }
}
