import express from 'express';
const router = express.Router();
import { ArticleController } from '../../app/controllers/ArticleController';
import { SessionTimeout } from '../../middlewares/session.middleware';

router.get('/create', SessionTimeout.checkSession, ArticleController.create);
router.post('/store', ArticleController.store);
router.get('/:id/edit', SessionTimeout.checkSession, ArticleController.edit);
router.put('/:id', ArticleController.update);
router.delete('/:id', ArticleController.delete);
router.get('/:slug', SessionTimeout.checkSession, ArticleController.show);

export default router;
