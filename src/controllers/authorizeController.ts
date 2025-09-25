import { Request, Response, NextFunction } from 'express';
import { supabase } from "../../supabase/client"
import { getAuthorizeToken } from '../utils/healper';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<boolean> => {
    console.log(`Authorize check for ${req.method} ${req.originalUrl}`);
    const token = getAuthorizeToken(req);
    if (!token) {
        res.status(401).json({ "status": 401, "message": 'No access token' });
        return false;
    }
    // console.log(`token: ${token}`);
    const { data, error } = await supabase.auth.getUser(`${token}`);
    if (error) {
        res.status(401).json({ "status": 401, "message": "Invalid session" });
        return false;
    }
    console.log(`Authorized pass`);
    return true;
}