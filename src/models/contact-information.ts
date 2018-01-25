import { Address } from './address';

export class ContactInformation {
    constructor(
        public address: Address,
        public emailAddress: string,
        public phoneNumber: string,
    ) {

    }

    public valid(): boolean {
        if (this.addressValid() && this.emailAddressValid() && this.phoneNumberValid()) {
            return true;
        }

        return false;
    }

    private addressValid(): boolean {
        return this.address ? this.address.valid() : false;
    }

    private emailAddressValid(): boolean {
        return this.emailAddress ? true : false;
    }

    private phoneNumberValid(): boolean {
        return this.phoneNumber ? true : false;
    }

}
