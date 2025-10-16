import { Request, Response, NextFunction } from 'express';
import { supabase } from "../../supabase/client"
import { Profile, SocialLink, SocialLinks } from '../models';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('about_me')
            .select("*")
            .limit(1)
            .maybeSingle();
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

export const getSocialLinks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('social_links')
            .select('*')
            .order('display_order', { ascending: true });
        if (!error) {
            const result: SocialLinks = data;
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

export const updateSocialLinkById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const requestBody: SocialLink = req.body;
            const { error } = await supabase
                .from('social_links')
                .update({
                    platform: requestBody.platform,
                    url: requestBody.url,
                    icon: requestBody.icon || null,
                    display_order: requestBody.display_order || 0,
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
};

export const addSocialLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: SocialLink = req.body;
        const { count } = await supabase
            .from("social_links")
            .select("*", { count: "exact", head: true });
        const { error } = await supabase
            .from('social_links')
            .insert([{
                about_me_id: requestBody.about_me_id,
                platform: requestBody.platform,
                url: requestBody.url,
                icon: requestBody.icon || null,
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

export const deleteSocialLinkById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const { error } = await supabase
                .from('social_links')
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

export const updateSocialLinkDisplayOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: SocialLinks = req.body;
        if (requestBody && requestBody.length > 0) {
            const updates = requestBody.map((link, index) =>
                supabase
                    .from('social_links')
                    .update({ display_order: index })
                    .eq('id', link.id)
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