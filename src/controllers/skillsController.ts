import { Request, Response, NextFunction } from 'express';
import { supabase } from "../../supabase/client"
import { Skill, Skills } from '../models';

export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('skills')
            .select();
        if (!error) {
            const result: Skills = data;
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

export const updateSkillById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const requestBody: Skill = req.body;
            const { error } = await supabase
                .from('skills')
                .update({
                    name: requestBody.name,
                    level: requestBody.level,
                    icon: requestBody.icon || null,
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
};

export const addSkill = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: Skill = req.body;
        const { error } = await supabase
            .from('skills')
            .insert([{
                name: requestBody.name,
                level: requestBody.level,
                icon: requestBody.icon || null,
                display_order: requestBody.display_order || 0,
            }])
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

export const deleteSkillById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const { error } = await supabase
                .from('skills')
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