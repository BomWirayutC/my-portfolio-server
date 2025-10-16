import { Router } from 'express';
import { uploadFile } from '../controllers/fileController';

const router = Router();
const prefix: string = "/file";

router.post(`${prefix}/uploadFile`, uploadFile);

export default router;