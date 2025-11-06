import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { supabase, SUPABASE_DB_KEY, SUPABASE_DB_URL } from "../../supabase/client"
import { createClient } from '@supabase/supabase-js';
import { getAuthorizeToken, uint8ToBase64 } from '../utils/healper';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req, res, async (err) => {
        try {
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
            const filePreview = fileExt?.toLocaleLowerCase() === 'pdf' ? await createBase64ImagePreviewFromPdfFile(file) : null;
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
                    "filePreview": filePreview,
                },
            });
        } catch (error) {
            console.log(`Upload image error: ${err}`);
            next(error);
        }
    })
}

const createBase64ImagePreviewFromPdfFile = async (pdfFile: Express.Multer.File): Promise<string> => {
    const mupdf = await import('mupdf');

    const arrayBuffer = pdfFile.buffer
    const doc = mupdf.PDFDocument.openDocument(arrayBuffer, "application/pdf");

    const page = doc.loadPage(0);
    const dpi = 200;
    const scale = dpi / 72;
    const pixmap = page.toPixmap(
        mupdf.Matrix.scale(scale, scale),
        mupdf.ColorSpace.DeviceRGB,
        false,
        true
    );
    const pngBytes = pixmap.asPNG();
    return `data:image/png;base64,${uint8ToBase64(pngBytes)}`;
}

export { uploadFile, createBase64ImagePreviewFromPdfFile };