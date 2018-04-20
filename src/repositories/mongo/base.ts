import * as mongoose from 'mongoose';

export class BaseRepository {

    protected static models: { Customer: any };

    constructor(protected uri: string) {
        mongoose.connect(this.uri);

        if (!BaseRepository.models) {
            this.configureModels();
        }

    }

    protected configureModels(): void {
        const Customer: any = new mongoose.Schema({
            contactInformation: {
                address: {
                    city: String,
                    country: String,
                    line1: String,
                    line2: String,
                    postalCode: String,
                },
                emailAddress: String,
                phoneNumber: String,
            },
            firstName: String,
            identificationNumber: String,
            lastName: String,
        });

        const CustomerModel = mongoose.model('Customer', Customer);

        BaseRepository.models = {
            Customer: CustomerModel,
        };
    }

}
