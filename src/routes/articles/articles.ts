import express from 'express';
const router = express.Router();
import articleController from '../../app/controllers/ArticleController';
import { validate } from '../../validation/book.validate';

router.get('/create', articleController.create);
router.post('/store', validate, articleController.store);
router.get('/:id/edit', articleController.edit);
router.put('/:id', articleController.update);
router.delete('/:id', articleController.delete);
router.get('/:slug', articleController.show);

export default router;
