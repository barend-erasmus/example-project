import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import { ICustomerRepository } from './interfaces/customer-repository';
import { IQueryBuilder } from './interfaces/query-builder';
import { config } from './config';
import { CustomerService } from './services/customer';
import { MongoSearchQueryBuilder } from './builders/mongo-search-query-builder';
import { MongoCustomerRepository } from './repositories/mongo/customer';
import { SQLSearchQueryBuilder } from './builders/sql-search-query-builder';
import { SQLCustomerRepository } from './repositories/sequelize/customer';
import { BaseRepository } from './repositories/sequelize/base';

const container: Container = new Container();

// container.bind<IQueryBuilder>("SearchQueryBuilder").to(MongoSearchQueryBuilder);

// container.bind<ICustomerRepository>("ICustomerRepository").toDynamicValue((context: interfaces.Context) => {
//     const searchQueryBuilder: IQueryBuilder = context.container.get<IQueryBuilder>("SearchQueryBuilder");

//     return new MongoCustomerRepository(searchQueryBuilder, config.database.mongo.uri);
// });


new BaseRepository().sync().then(() => {

});

container.bind<IQueryBuilder>("SearchQueryBuilder").to(SQLSearchQueryBuilder);

container.bind<ICustomerRepository>("ICustomerRepository").toDynamicValue((context: interfaces.Context) => {
    const searchQueryBuilder: IQueryBuilder = context.container.get<IQueryBuilder>("SearchQueryBuilder");

    return new SQLCustomerRepository(searchQueryBuilder);
});

container.bind<CustomerService>("CustomerService").to(CustomerService);

export {
    container,
};