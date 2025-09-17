import { Router } from 'express';
import {
    getProfile,
    updateProfile,
} from '../controllers/profileController';

const router = Router();

router.get('/getProfile', getProfile);
router.post('/updateProfile', updateProfile);

export default router;