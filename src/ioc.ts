import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { MongoSearchQueryBuilder } from './builders/mongo-search-query-builder';
import { SQLSearchQueryBuilder } from './builders/sql-search-query-builder';
import { config } from './config';
import { ICustomerRepository } from './interfaces/customer-repository';
import { ICustomerService } from './interfaces/customer-service';
import { IQueryBuilder } from './interfaces/query-builder';
import { Address } from './models/address';
import { ContactInformation } from './models/contact-information';
import { Customer } from './models/customer';
import { MongoCustomerRepository } from './repositories/mongo/customer';
import { BaseRepository } from './repositories/sequelize/base';
import { SQLCustomerRepository } from './repositories/sequelize/customer';
import { CustomerService } from './services/customer';

const container: Container = new Container();

// container.bind<IQueryBuilder>('SearchQueryBuilder').to(MongoSearchQueryBuilder);

// container.bind<ICustomerRepository>('ICustomerRepository').toDynamicValue((context: interfaces.Context) => {
//     const searchQueryBuilder: IQueryBuilder = context.container.get<IQueryBuilder>('SearchQueryBuilder');

//     return new MongoCustomerRepository(searchQueryBuilder, config.database.mongo.uri);
// });

new BaseRepository().sync().then(() => {
    const customerRepository: ICustomerRepository = container.get<ICustomerRepository>('ICustomerRepository');

    return Promise.all([
        customerRepository.create(new Customer(null, new ContactInformation(new Address('Cape Town', 'South Africa', 'Line 1', 'Line 2', '1234'), 'adam.carr@example.com', '(516) 366 1394'), 'Adam', '1234567890', 'Carr')),
        customerRepository.create(new Customer(null, new ContactInformation(new Address('Cape Town', 'South Africa', 'Line 1', 'Line 2', '1234'), 'raymond.wells@example.com', '(924) 163 7209'), 'Raymond', '0987654321', 'Wells')),
    ]);
});

container.bind<IQueryBuilder>('SearchQueryBuilder').to(SQLSearchQueryBuilder);

container.bind<ICustomerRepository>('ICustomerRepository').toDynamicValue((context: interfaces.Context) => {
    const searchQueryBuilder: IQueryBuilder = context.container.get<IQueryBuilder>('SearchQueryBuilder');

    return new SQLCustomerRepository(searchQueryBuilder);
});

container.bind<ICustomerService>('ICustomerService').to(CustomerService);

export {
    container,
};
