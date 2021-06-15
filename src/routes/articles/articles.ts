import express from 'express';
const router = express.Router();
import { ArticleController } from '../../app/controllers/ArticleController';

router.get('/create', ArticleController.create);
router.post('/store', ArticleController.store);
router.get('/:id/edit', ArticleController.edit);
router.put('/:id', ArticleController.update);
router.delete('/:id', ArticleController.delete);
router.get('/:slug', ArticleController.show);

export default router;
