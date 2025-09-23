import { Router } from 'express';
import {
    getProjects,
    addProject,
    deleteProject,
    updateProject,
} from '../controllers/projectController';

const router = Router();

router.get('/getProjects', getProjects);
router.post('/addProject', addProject);
router.post('/deleteProject', deleteProject);
router.post('/updateProject', updateProject);

export default router;