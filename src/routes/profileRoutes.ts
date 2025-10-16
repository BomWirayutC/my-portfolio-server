import { Router } from 'express';
import {
    getProfile,
    updateProfile,
} from '../controllers/profileController';

const router = Router();
const prefix: string = "/profile";

router.get(`${prefix}/getProfile`, getProfile);
router.post(`${prefix}/updateProfile`, updateProfile);

export default router;