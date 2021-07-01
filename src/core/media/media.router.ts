import express from 'express';
import { multerUploadOne, multerUploadMany } from './base/multer';
import { MediaController } from './media.controller';

const router = express.Router();

router.post('/uploadone', multerUploadOne, MediaController.uploadOne);
router.post('/deleteone', multerUploadOne, MediaController.deleteOne);
router.post('/uploadmany', multerUploadMany, MediaController.uploadMany);

export default router;
