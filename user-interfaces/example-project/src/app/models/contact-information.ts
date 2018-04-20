import { Address } from './address';

export class ContactInformation {

    constructor(
        public address: Address,
        public emailAddress: string,
        public phoneNumber: string,
    ) {

    }

}
