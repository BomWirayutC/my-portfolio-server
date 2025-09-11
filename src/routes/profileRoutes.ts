import { Router } from 'express';
import {
    getProfile,
    updateProfile,
    uploadImage,
} from '../controllers/profileController';

const router = Router();

router.get('/getProfile', getProfile);
router.post('/updateProfile', updateProfile);
router.post('/uploadImage', uploadImage);

export default router;