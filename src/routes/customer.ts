import * as express from 'express';
import { request } from 'https';
import { Query } from 'mongoose';
import { SearchQueryBuilder } from '../builders/search-query-builder';
import { config } from '../config';
import { ICustomerRepository } from '../interfaces/customer-repository';
import { ICustomerService } from '../interfaces/customer-service';
import { CustomerMapper } from '../mappers/customer';
import { Customer } from '../models/customer';
import { CustomerRepository } from '../repositories/customer';
import { CustomerService } from '../services/customer';
import { container } from '../ioc';

export class CustomerRoute {

    private static customerService: ICustomerRepository;

    public static async get(req: express.Request, res: express.Response) {
        try {

            const customerService: CustomerService = container.get<CustomerService>("CustomerService");
            
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

            const customerService: CustomerService = container.get<CustomerService>("CustomerService");

            const result: Customer = await customerService.create(customer);

            res.json(result);

        } catch (err) {
            CustomerRoute.sendErrorResponse(err, res);
        }
    }

    public static async search(req: express.Request, res: express.Response) {
        try {
            const query = req.query;

            const customerService: CustomerService = container.get<CustomerService>("CustomerService");

            const result: Customer[] = await customerService.search(query);

            res.json(result);

        } catch (err) {
            CustomerRoute.sendErrorResponse(err, res);
        }
    }

    private static sendErrorResponse(err: Error, res: express.Response): void {
        res.status(400).json({
            message: err.message,
        });
    }
}
