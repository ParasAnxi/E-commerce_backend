import express from 'express';
import { uploadSingle, uploadMultiple } from '../controllers/upload.controller';
import { upload } from '../config/cloudinary';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/single', authenticate, upload.single('image'), uploadSingle);
router.post('/multiple', authenticate, upload.array('images', 5), uploadMultiple);

export default router;
