import * as express from 'express';

export class AuthenticationMiddleware {
    public static shouldBeAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction): void {

        next();
    }
}
