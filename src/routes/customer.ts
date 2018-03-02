import * as express from 'express';
import { config } from '../config';
import { ICustomerService } from '../interfaces/customer-service';
import { container } from '../ioc';
import { Address } from '../models/address';
import { ContactInformation } from '../models/contact-information';
import { Customer } from '../models/customer';

export class CustomerRoute {

    public static async get(req: express.Request, res: express.Response) {
        try {
            const customerService: ICustomerService = container.get<ICustomerService>('ICustomerService');

            const result: Customer = await customerService.find(req.query.identificationNumber);

            res.json(result);

        } catch (err) {
            CustomerRoute.sendErrorResponse(err, res);
        }
    }

    public static async post(req: express.Request, res: express.Response) {
        try {
            const body = req.body;

            const customerService: ICustomerService = container.get<ICustomerService>('ICustomerService');

            const result: Customer = await customerService.create(new Customer(
                body.id,
                new ContactInformation(
                    new Address(
                        body.contactInformation.address.city,
                        body.contactInformation.address.country,
                        body.contactInformation.address.line1,
                        body.contactInformation.address.line2,
                        body.contactInformation.address.postalCode,
                    ),
                    body.contactInformation.emailAddress,
                    body.contactInformation.phoneNumber,
                ),
                body.firstName,
                body.identificationNumber,
                body.lastName,
            ));

            res.json(result);

        } catch (err) {
            CustomerRoute.sendErrorResponse(err, res);
        }
    }

    private static sendErrorResponse(err: Error, res: express.Response): void {
        res.status(400).json(err);
    }
}
