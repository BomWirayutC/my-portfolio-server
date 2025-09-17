import { Router } from 'express';
import {
    getCertificates,
    addCertificate,
    deleteCertificate,
    updateCertificate,
} from '../controllers/certificateController';

const router = Router();

router.get('/getCertificates', getCertificates);
router.post('/addCertificate', addCertificate);
router.post('/deleteCertificate', deleteCertificate);
router.post('/updateCertificate', updateCertificate);

export default router;