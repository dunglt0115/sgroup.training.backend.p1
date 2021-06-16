// File này để route cho tất cả các site không thuộc một site nào khác
import express from 'express';
const router = express.Router();
import { SiteController } from '../../app/controllers/SiteController';
import { SessionTimeout } from '../../middlewares/session.middleware';

router.get('/', SessionTimeout.checkSession, SiteController.index);

export default router;
