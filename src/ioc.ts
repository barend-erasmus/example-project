import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import { ICustomerRepository } from './interfaces/customer-repository';
import { CustomerRepository } from './repositories/customer';
import { IQueryBuilder } from './interfaces/query-builder';
import { config } from './config';
import { CustomerService } from './services/customer';
import { SearchQueryBuilder } from './builders/search-query-builder';

const container: Container = new Container();

container.bind<IQueryBuilder>("SearchQueryBuilder").to(SearchQueryBuilder);

container.bind<ICustomerRepository>("ICustomerRepository").toDynamicValue((context: interfaces.Context) => {
    const searchQueryBuilder: IQueryBuilder = context.container.get<IQueryBuilder>("SearchQueryBuilder");

    return new CustomerRepository(searchQueryBuilder, config.database.mongo.uri);
});

container.bind<CustomerService>("CustomerService").to(CustomerService);

export {
    container,
};