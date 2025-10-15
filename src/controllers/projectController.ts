import { Request, Response, NextFunction } from 'express';
import { supabase } from "../../supabase/client"
import { Project, Projects } from '../models';

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('display_order', { ascending: true });
        if (!error) {
            const result: Projects = data;
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

export const addProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: Project = req.body;
        const { count } = await supabase
            .from("projects")
            .select("*", { count: "exact", head: true });
        const { error } = await supabase
            .from('projects')
            .insert([{
                title: requestBody.title,
                description: requestBody.description,
                image: requestBody.image,
                technologies: requestBody.technologies,
                demo_url: requestBody.demo_url || null,
                github_url: requestBody.github_url || null,
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

export const deleteProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const { error } = await supabase
                .from('projects')
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

export const updateProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const requestBody: Project = req.body;
            const { error } = await supabase
                .from('projects')
                .update({
                    title: requestBody.title,
                    description: requestBody.description,
                    image: requestBody.image,
                    technologies: requestBody.technologies,
                    demo_url: requestBody.demo_url || null,
                    github_url: requestBody.github_url || null,
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

export const updateProjectDisplayOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: Projects = req.body;
        if (requestBody && requestBody.length > 0) {
            const updates = requestBody.map((project, index) =>
                supabase
                    .from('projects')
                    .update({ display_order: index })
                    .eq('id', project.id)
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