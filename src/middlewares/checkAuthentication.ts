import { Request, Response, NextFunction } from 'express';
import { isAuthorized } from '../controllers/authorizeController';

export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request Method: ${req.method}, URL: ${req.originalUrl}`);
    if (req.method === "POST") {
        if (await isAuthorized(req, res, next)) {
            next();
        }
    } else {
        next();
    }
}