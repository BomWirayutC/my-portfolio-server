import { Router } from 'express';
import {
    getProfile,
    updateProfile,
    getSocialLinks,
    updateSocialLinkById,
    addSocialLink,
    deleteSocialLinkById,
    updateSocialLinkDisplayOrder,
} from '../controllers/profileController';

const router = Router();
const prefix: string = "/profile";

router.get(`${prefix}/getProfile`, getProfile);
router.post(`${prefix}/updateProfile`, updateProfile);
router.get(`${prefix}/getSocialLinks`, getSocialLinks);
router.post(`${prefix}/updateSocialLinkById`, updateSocialLinkById);
router.post(`${prefix}/addSocialLink`, addSocialLink);
router.post(`${prefix}/deleteSocialLinkById`, deleteSocialLinkById);
router.post(`${prefix}/updateSocialLinkDisplayOrder`, updateSocialLinkDisplayOrder);

export default router;