import { Router } from 'express';
import {
    getCertificates,
    addCertificate,
    deleteCertificateById,
    updateCertificateById,
    updateCertificateDisplayOrder
} from '../controllers/certificateController';

const router = Router();
const prefix: string = "/certificate";

router.get(`${prefix}/getCertificates`, getCertificates);
router.post(`${prefix}/addCertificate`, addCertificate);
router.post(`${prefix}/deleteCertificateById`, deleteCertificateById);
router.post(`${prefix}/updateCertificateById`, updateCertificateById);
router.post(`${prefix}/updateCertificateDisplayOrder`, updateCertificateDisplayOrder);

export default router;