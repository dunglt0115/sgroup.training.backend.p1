import express from 'express';
const router = express.Router();
import { MeController } from '../../app/controllers/MeController';

router.get('/stored/articles', MeController.storedArticles);

export default router;
