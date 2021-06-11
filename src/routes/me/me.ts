import express from 'express';
const router = express.Router();
import meController from '../../app/controllers/MeController';

router.get('/stored/articles', meController.storedArticles);

export default router;
