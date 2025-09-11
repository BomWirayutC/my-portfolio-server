import { Request } from 'express';

export const isOnVercelEnv = (): boolean => {
    return process.env.VERCEL === '1';
}

export const getAuthorizeToken = (req: Request): string => {
    return req.headers['x-access-token'] ? req.headers['x-access-token'].toString() : "";
}