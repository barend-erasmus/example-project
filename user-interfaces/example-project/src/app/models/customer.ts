import { ContactInformation } from './contact-information';

export class Customer {

    constructor(
        public id: string,
        public contactInformation: ContactInformation,
        public firstName: string,
        public identificationNumber: string,
        public lastName: string,
    ) {

    }

}
