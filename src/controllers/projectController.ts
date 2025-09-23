import { Request, Response, NextFunction } from 'express';
import { supabase } from "../../supabase/client"
import { Project, Projects } from '../models';

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
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
        const { error } = await supabase
            .from('projects')
            .insert([{
                title: requestBody.title,
                description: requestBody.description,
                image: requestBody.image,
                technologies: requestBody.technologies,
                demo_url: requestBody.demo_url || null,
                github_url: requestBody.github_url || null,
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

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
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

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
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