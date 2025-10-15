import { Router } from 'express';
import {
    getSkills,
    updateSkillById,
    addSkill,
    deleteSkillById,
    updateSkillDisplayOrder
} from '../controllers/skillsController';

const router = Router();

router.get('/getSkills', getSkills);
router.post('/updateSkillById', updateSkillById);
router.post('/addSkill', addSkill);
router.post('/deleteSkillById', deleteSkillById);
router.post('/updateSkillDisplayOrder', updateSkillDisplayOrder);

export default router;