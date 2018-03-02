import * as express from 'express';
import { config } from '../config';
import { ICustomerService } from '../interfaces/customer-service';
import { container } from '../ioc';
import { CustomerMapper } from '../mappers/customer';
import { Customer } from '../models/customer';

export class CustomerRoute {

    public static async get(req: express.Request, res: express.Response) {
        try {
            const customerService: ICustomerService = container.get<ICustomerService>('ICustomerService');

            const result: Customer = await customerService.find(req.query.id);

            res.json(result);

        } catch (err) {
            CustomerRoute.sendErrorResponse(err, res);
        }
    }

    public static async post(req: express.Request, res: express.Response) {
        try {
            const body = req.body;

            const customerMapper: CustomerMapper = new CustomerMapper();

            const customer: Customer = customerMapper.map(req.body);

            const customerService: ICustomerService = container.get<ICustomerService>('ICustomerService');

            const result: Customer = await customerService.create(customer);

            res.json(result);

        } catch (err) {
            CustomerRoute.sendErrorResponse(err, res);
        }
    }

    public static async search(req: express.Request, res: express.Response) {
        try {
            const query = req.query;

            const customerService: ICustomerService = container.get<ICustomerService>('ICustomerService');

            const result: Customer[] = await customerService.search(query);

            res.json(result);

        } catch (err) {
            CustomerRoute.sendErrorResponse(err, res);
        }
    }

    private static sendErrorResponse(err: Error, res: express.Response): void {
        res.status(400).json(err);
    }
}
