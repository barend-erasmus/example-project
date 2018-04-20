import * as express from 'express';

export class ErrorMiddleware {

    public static handle(err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void {
        ErrorMiddleware.sendErrorResponse(err, res);
    }

    protected static sendErrorResponse(err: Error, res: express.Response): void {
        res.status(400).json(err);
    }
}
