import { Router } from 'express';
import {
    getSkills,
    updateSkillById,
    addSkill,
    deleteSkillById,
    updateSkillDisplayOrder
} from '../controllers/skillsController';

const router = Router();
const prefix: string = "/skill";

router.get(`${prefix}/getSkills`, getSkills);
router.post(`${prefix}/updateSkillById`, updateSkillById);
router.post(`${prefix}/addSkill`, addSkill);
router.post(`${prefix}/deleteSkillById`, deleteSkillById);
router.post(`${prefix}/updateSkillDisplayOrder`, updateSkillDisplayOrder);

export default router;