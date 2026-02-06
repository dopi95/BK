import { Router } from 'express';
import { updateProfile, changePassword } from '../controllers/profileController';

const router = Router();

router.put('/update', updateProfile);
router.put('/change-password', changePassword);

export default router;
