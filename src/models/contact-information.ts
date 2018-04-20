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

    protected addressValid(): boolean {
        return this.address ? this.address.valid() : false;
    }

    protected emailAddressValid(): boolean {
        return this.emailAddress ? true : false;
    }

    protected phoneNumberValid(): boolean {
        return this.phoneNumber ? true : false;
    }

}
