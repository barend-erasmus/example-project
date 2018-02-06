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
}
