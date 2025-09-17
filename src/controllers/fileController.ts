import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { supabase, SUPABASE_DB_KEY, SUPABASE_DB_URL } from "../../supabase/client"
import { isAuthorized } from './authorizeController';
import { createClient } from '@supabase/supabase-js';
import { getAuthorizeToken } from '../utils/healper';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
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
                        "fileUrl": publicUrl.publicUrl,
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

export { uploadFile };