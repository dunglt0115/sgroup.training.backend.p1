import express from 'express';
import { multerUploader } from '../../middlewares/multer.middleware';
import { MediaController } from './media.controller';

const router = express.Router();

router.post('/uploadone', multerUploader, MediaController.uploadOne);

export default router;
