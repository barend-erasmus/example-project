import * as express from 'express';
import { request } from 'https';
import { Query } from 'mongoose';
import { SearchQueryBuilder } from '../builders/search-query-builder';
import { ICustomerRepository } from '../interfaces/customer-repository';
import { ICustomerService } from '../interfaces/customer-service';
import { CustomerMapper } from '../mappers/customer';
import { Customer } from '../models/customer';
import { CustomerRepository } from '../repositories/customer';
import { CustomerService } from '../services/customer';

export class CustomerRoute {

    private static customerService: ICustomerRepository;

    public static async get(req: express.Request, res: express.Response) {
        try {

            const result: Customer = await CustomerRoute.getCustomerService().find(req.query.id);

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

            const result: Customer = await CustomerRoute.getCustomerService().create(customer);

            res.json(result);

        } catch (err) {
            CustomerRoute.sendErrorResponse(err, res);
        }
    }

    public static async search(req: express.Request, res: express.Response) {
        try {
            const query = req.query;

            const result: Customer[] = await CustomerRoute.getCustomerService().search(query);

            res.json(result);

        } catch (err) {
            CustomerRoute.sendErrorResponse(err, res);
        }
    }

    private static getCustomerService(): ICustomerService {

        if (CustomerRoute.customerService) {
            return CustomerRoute.customerService;
        }

        const customerRepository: ICustomerRepository = new CustomerRepository(new SearchQueryBuilder(), 'mongodb://localhost:27017/example-project');

        CustomerRoute.customerService = new CustomerService(customerRepository);

        return CustomerRoute.customerService;
    }

    private static sendErrorResponse(err: Error, res: express.Response): void {
        res.status(400).json({
            message: err.message,
        });
    }
}
