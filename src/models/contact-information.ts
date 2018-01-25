import { Address } from './address';

export class ContactInformation {
    constructor(
        public address: Address,
        public emailAddress: string,
        public phoneNumber: string,
    ) {

    }

    public addressValid(): boolean {
        return this.address ? this.address.valid() : false;
    }

    public emailAddressValid(): boolean {
        return this.emailAddress ? true : false;
    }

    public phoneNumberValid(): boolean {
        return this.phoneNumber ? true : false;
    }

    public valid(): boolean {
        if (this.addressValid() && this.emailAddressValid() && this.phoneNumberValid()) {
            return true;
        }

        return false;
    }
}
