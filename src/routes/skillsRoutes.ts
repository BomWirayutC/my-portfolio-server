import { Router } from 'express';
import {
    getSkills,
    updateSkill,
    addSkill,
    deleteSkill,
} from '../controllers/skillsController';

const router = Router();

router.get('/getSkills', getSkills);
router.post('/updateSkill', updateSkill);
router.post('/addSkill', addSkill);
router.post('/deleteSkill', deleteSkill);

export default router;