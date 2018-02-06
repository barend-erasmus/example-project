import * as express from 'express';
import { request } from 'https';
import { Query } from 'mongoose';
import { config } from '../config';
import { container } from '../ioc';
import { CustomerMapper } from '../mappers/customer';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer';

export class CustomerRoute {

    public static async get(req: express.Request, res: express.Response) {
        const customerService: CustomerService = container.get<CustomerService>('CustomerService');

        const result: Customer = await customerService.find(req.query.id);

        res.json(result);
    }

    public static async post(req: express.Request, res: express.Response) {
        const body = req.body;

        const customerMapper: CustomerMapper = new CustomerMapper();

        const customer: Customer = customerMapper.map(req.body);

        const customerService: CustomerService = container.get<CustomerService>('CustomerService');

        const result: Customer = await customerService.create(customer);

        res.json(result);
    }

    public static async search(req: express.Request, res: express.Response) {
        const query = req.query;

        const customerService: CustomerService = container.get<CustomerService>('CustomerService');

        const result: Customer[] = await customerService.search(query);

        res.json(result);
    }
}
