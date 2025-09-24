import { Router } from 'express';
import {
    getProjects,
    addProject,
    deleteProjectById,
    updateProjectById,
} from '../controllers/projectController';

const router = Router();

router.get('/getProjects', getProjects);
router.post('/addProject', addProject);
router.post('/deleteProjectById', deleteProjectById);
router.post('/updateProjectById', updateProjectById);

export default router;