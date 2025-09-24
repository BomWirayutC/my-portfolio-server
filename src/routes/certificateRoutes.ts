import { Router } from 'express';
import {
    getCertificates,
    addCertificate,
    deleteCertificateById,
    updateCertificateById,
} from '../controllers/certificateController';

const router = Router();

router.get('/getCertificates', getCertificates);
router.post('/addCertificate', addCertificate);
router.post('/deleteCertificateById', deleteCertificateById);
router.post('/updateCertificateById', updateCertificateById);

export default router;