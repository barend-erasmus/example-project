import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { MongoSearchQueryBuilder } from './builders/mongo-search-query-builder';
import { SQLSearchQueryBuilder } from './builders/sql-search-query-builder';
import { config } from './config';
import { ICustomerRepository } from './interfaces/customer-repository';
import { IQueryBuilder } from './interfaces/query-builder';
import { MongoCustomerRepository } from './repositories/mongo/customer';
import { BaseRepository } from './repositories/sequelize/base';
import { SQLCustomerRepository } from './repositories/sequelize/customer';
import { CustomerService } from './services/customer';

const container: Container = new Container();

container.bind<IQueryBuilder>('SearchQueryBuilder').to(MongoSearchQueryBuilder);

container.bind<ICustomerRepository>('ICustomerRepository').toDynamicValue((context: interfaces.Context) => {
    const searchQueryBuilder: IQueryBuilder = context.container.get<IQueryBuilder>('SearchQueryBuilder');

    return new MongoCustomerRepository(searchQueryBuilder, config.database.mongo.uri);
});

// new BaseRepository().sync().then(() => {

// });

// container.bind<IQueryBuilder>('SearchQueryBuilder').to(SQLSearchQueryBuilder);

// container.bind<ICustomerRepository>('ICustomerRepository').toDynamicValue((context: interfaces.Context) => {
//     const searchQueryBuilder: IQueryBuilder = context.container.get<IQueryBuilder>('SearchQueryBuilder');

//     return new SQLCustomerRepository(searchQueryBuilder);
// });

container.bind<CustomerService>('CustomerService').to(CustomerService);

export {
    container,
};
