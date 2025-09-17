import { Router } from 'express';
import { uploadFile } from '../controllers/fileController';

const router = Router();

router.post('/uploadFile', uploadFile);

export default router;