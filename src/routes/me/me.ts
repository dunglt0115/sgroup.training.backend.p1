import express from 'express';
const router = express.Router();
import { MeController } from '../../app/controllers/MeController';
import { SessionTimeout } from '../../middlewares/session.middleware';

router.get('/stored/articles', SessionTimeout.checkSession, MeController.storedArticles);

export default router;
