import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as swagger from 'swagger-ui-express';
import * as yargs from 'yargs';
import { AuthenticationMiddleware } from './middleware/authentication';
import { CustomerRoute } from './routes/customer';

const argv = yargs.argv;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));

const swaggerDocument = fs.readFileSync(path.join(__dirname, '..', 'swagger.json'), 'utf8');

app.use('/api/docs', swagger.serve, swagger.setup(JSON.parse(swaggerDocument), { explore: true }));

app.route('/api/customer')
    .get(AuthenticationMiddleware.shouldBeAuthenticated, CustomerRoute.get)
    .post(AuthenticationMiddleware.shouldBeAuthenticated, CustomerRoute.post);

app.route('/api/customer/search')
    .get(AuthenticationMiddleware.shouldBeAuthenticated, CustomerRoute.search);

app.listen(argv.port || 3000, () => {
    console.log(`listening on port ${argv.port || 3000}`);
});
