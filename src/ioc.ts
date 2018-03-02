import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { config } from './config';
import { ICustomerRepository } from './interfaces/customer-repository';
import { ICustomerService } from './interfaces/customer-service';
import { MongoCustomerRepository } from './repositories/mongo/customer';
import { CustomerService } from './services/customer';

const container: Container = new Container();

container.bind<ICustomerRepository>('ICustomerRepository').toDynamicValue((context: interfaces.Context) => {
    return new MongoCustomerRepository(config.database.mongo.uri);
});

container.bind<ICustomerService>('ICustomerService').to(CustomerService);

export {
    container,
};
