import { Address } from '../models/address';
import { ContactInformation } from '../models/contact-information';
import { Customer } from '../models/customer';

export class CustomerMapper {
    public map(obj: any): Customer {

        const customer = this.mapObject(obj,  new Customer(null, null, null, null, null));

        customer.contactInformation = this.mapContactInformation(obj.contactInformation);

        return customer;
    }

    private mapContactInformationAddress(obj: any): Address {

        const address: Address = new Address(null, null, null, null, null);

        return this.mapObject<Address>(obj, address);
    }

    private mapContactInformation(obj: any): ContactInformation {

        if (!obj) {
            return null;
        }

        let contactInformation: ContactInformation = new ContactInformation(null, null, null);

        contactInformation = this.mapObject<ContactInformation>(obj, contactInformation);

        contactInformation.address = this.mapContactInformationAddress(obj.address);

        return contactInformation;
    }

    private mapObject<T>(obj: any, instance: T): T {

        if (!obj) {
            return null;
        }

        for (const key of Object.keys(instance)) {
            instance[key] = obj[key];
        }

        return instance;
    }

}
