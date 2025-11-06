import { Request } from 'express';

export const isOnVercelEnv = (): boolean => {
    return process.env.VERCEL === '1';
}

export const getAuthorizeToken = (req: Request): string => {
    return req.headers['x-access-token'] ? req.headers['x-access-token'].toString() : "";
}

export const uint8ToBase64 = (uint8: Uint8Array): string => {
    let binary = "";
    const chunk = 0x8000;
    for (let i = 0; i < uint8.length; i += chunk) {
        binary += String.fromCharCode(...uint8.subarray(i, i + chunk));
    }
    return btoa(binary);
}