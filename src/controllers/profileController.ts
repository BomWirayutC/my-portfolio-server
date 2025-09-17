import { Request, Response, NextFunction } from 'express';
import { supabase } from "../../supabase/client"
import { Profile } from '../models';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('about_me')
            .select().single();
        if (!error) {
            const result: Profile = data;
            res.json({
                "status": 200,
                "message": "Success",
                "data": result,
            });
        } else {
            res.status(500).json({
                "status": 500,
                "message": `Error: ${error.message}`,
            });
        }
    } catch (error) {
        next(error);
    }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const requestBody: Profile = req.body;
            const { error } = await supabase
                .from("about_me")
                .update({
                    title: requestBody.title,
                    name: requestBody.name,
                    description: requestBody.description,
                    bio: requestBody.bio,
                    avatar_url: requestBody.avatar_url || null,
                    cover_image: requestBody.cover_image || null,
                    location: requestBody.location || null,
                    email: requestBody.email || null,
                    phone: requestBody.phone || null,
                    linkedin_url: requestBody.linkedin_url || null,
                    github_url: requestBody.github_url || null,
                    resume_url: requestBody.resume_url || null,
                    updated_at: new Date().toISOString(),
                }).eq("id", id);
            if (!error) {
                res.json({
                    "status": 200,
                    "message": "Success",
                });
            } else {
                res.status(500).json({
                    "status": 500,
                    "message": `Error: ${error.message}`,
                });
            }
        } else {
            res.status(500).json({
                "status": 500,
                "message": "ID is required",
            });
        }
    } catch (error) {
        next(error);
    }
}