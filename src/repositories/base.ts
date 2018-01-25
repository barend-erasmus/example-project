import * as mongoose from 'mongoose';

export class BaseRepository {

    protected models: { CustomerModel: any };

    constructor(private uri: string) {
        mongoose.connect(this.uri);

        this.configureModels();

    }

    private configureModels(): void {
        const Customer: any = new mongoose.Schema({
            id: String,
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

        this.models = {
            CustomerModel,
        };
    }
}
