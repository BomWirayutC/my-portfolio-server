import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { supabase, SUPABASE_DB_KEY, SUPABASE_DB_URL } from "../../supabase/client"
import { Profile } from '../models';
import { isAuthorized } from './authorizeController';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { getAuthorizeToken } from '../utils/healper';

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

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req, res, async (err) => {
        try {
            if (await isAuthorized(req, res, next)) {
                if (!req.file || err) return res.status(400).json({ "status": 400, "message": "No file" });
                const file = req.file;
                const { fileName, bucket } = req.body;
                // bucket: avatars, covers and projects
                if (!bucket) return res.status(500).json({ "status": 500, "message": "Bucket required" });
                const fileExt = file.originalname.split('.').pop();
                const uniqueFileName = fileName || `${Date.now()}.${fileExt}`;
                const token = getAuthorizeToken(req);
                const userScoped = createClient(SUPABASE_DB_URL, SUPABASE_DB_KEY, {
                    global: { headers: { Authorization: `Bearer ${token}` } }
                });
                const { error: uploadError } = await userScoped.storage
                    .from(bucket)
                    .upload(
                        uniqueFileName,
                        file.buffer,
                        { contentType: file.mimetype }
                    );
                if (uploadError) return res.status(500).json({ "status": 500, "message": `Upload error: ${uploadError}` });
                const { data: publicUrl } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(uniqueFileName);
                res.json({
                    "status": 200,
                    "message": "Success",
                    "data": {
                        "imageUrl": publicUrl.publicUrl,
                        "bucket": bucket,
                        "fileName": uniqueFileName,
                    },
                });
            }
        } catch (error) {
            console.log(`Upload image error: ${err}`);
            next(error);
        }
    })
}