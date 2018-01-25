import { Query } from '../models/query';

export interface IQueryBuilder {
    build(query: Query): any;
}
