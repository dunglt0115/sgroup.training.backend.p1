import express from 'express';
import { multerUploader } from './base/multer';
import { MediaController } from './media.controller';

const router = express.Router();

router.post('/uploadone', multerUploader, MediaController.uploadOne);
router.post('/deleteone', multerUploader, MediaController.deleteOne);

export default router;
