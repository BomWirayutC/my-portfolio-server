import { Request, Response, NextFunction } from 'express';
import { supabase } from "../../supabase/client"
import { getAuthorizeToken } from '../utils/healper';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<boolean> => {
    const token = getAuthorizeToken(req);
    if (!token) {
        res.status(401).json({ "status": 401, "message": 'No token' });
        return false;
    }
    // console.log(`token: ${token}`);
    const { data, error } = await supabase.auth.getUser(`${token}`);
    if (error) {
        res.status(401).json({ "status": 401, "message": "Invalid session" });
        return false;
    }
    return true;
}