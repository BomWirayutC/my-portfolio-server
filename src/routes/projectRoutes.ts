import { Router } from 'express';
import {
    getProjects,
    addProject,
    deleteProjectById,
    updateProjectById,
    updateProjectDisplayOrder
} from '../controllers/projectController';

const router = Router();
const prefix: string = "/project";

router.get(`${prefix}/getProjects`, getProjects);
router.post(`${prefix}/addProject`, addProject);
router.post(`${prefix}/deleteProjectById`, deleteProjectById);
router.post(`${prefix}/updateProjectById`, updateProjectById);
router.post(`${prefix}/updateProjectDisplayOrder`, updateProjectDisplayOrder);

export default router;