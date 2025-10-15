import { Request, Response, NextFunction } from 'express';
import { supabase } from "../../supabase/client"
import { Certificate, Certificates } from '../models';

export const getCertificates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .order('display_order', { ascending: true });
        if (!error) {
            const result: Certificates = data;
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
};

export const addCertificate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: Certificate = req.body;
        const { count } = await supabase
            .from("certificates")
            .select("*", { count: "exact", head: true });
        const { error } = await supabase
            .from('certificates')
            .insert([{
                title: requestBody.title,
                issuer: requestBody.issuer,
                image: requestBody.image || null,
                certificate_url: requestBody.certificate_url || null,
                issue_date: requestBody.issue_date || null,
                description: requestBody.description || null,
                display_order: (count || 0) + 1,
            }]);
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
    } catch (error) {
        next(error);
    }
};

export const deleteCertificateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const { error } = await supabase
                .from('certificates')
                .delete()
                .eq('id', id);
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
};

export const updateCertificateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const requestBody: Certificate = req.body;
            const { error } = await supabase
                .from('certificates')
                .update({
                    title: requestBody.title,
                    issuer: requestBody.issuer,
                    image: requestBody.image || null,
                    certificate_url: requestBody.certificate_url || null,
                    issue_date: requestBody.issue_date || null,
                    description: requestBody.description || null,
                    display_order: requestBody.display_order || 0,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id);
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

export const updateCertificateDisplayOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: Certificates = req.body;
        if (requestBody && requestBody.length > 0) {
            const updates = requestBody.map((cert, index) =>
                supabase
                    .from('certificates')
                    .update({ display_order: index })
                    .eq('id', cert.id)
            );
            const result = await Promise.all(updates);
            if (result.every(r => !r.error)) {
                res.json({
                    "status": 200,
                    "message": "Success",
                });
            } else {
                res.status(500).json({
                    "status": 500,
                    "message": `Error: ${result.find(r => r.error)?.error?.message}`,
                });
            }
        } else {
            res.status(500).json({
                "status": 500,
                "message": "Body is required",
            });
        }
    } catch (error) {
        next(error);
    }
};