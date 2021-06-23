import express from 'express';
const router = express.Router();
import { Request, Response, NextFunction } from 'express';
import { ArticleController } from './article.controller';
import { SessionTimeout } from '../../middlewares/session.middleware';
import { mongooseToObject } from '../../utils/mongoose';
import ArticleModel from '../../models/Articles';

// Page: Detail
router.get('/:slug', SessionTimeout.checkSession, (req: Request, res: Response, next: NextFunction) => {
    ArticleModel.findOne({slug: req.params.slug})
        .then(article => {
            res.render('articles/show', {
                article: mongooseToObject(article)
            })
        })
        .catch(next)
});

// Page: Add new article
router.get('/create', SessionTimeout.checkSession, (req: Request, res: Response, next: NextFunction) => {
    return res.render('articles/create');
});

router.post('/store', ArticleController.store);

// Page: Edit article
router.get('/:id/edit', SessionTimeout.checkSession, (req: Request, res: Response, next: NextFunction) => {
    ArticleModel.findById(req.params.id)
        .then(article => res.render('articles/edit', {
            article: mongooseToObject(article)
        }))
        .catch(next)
});

router.put('/:id', ArticleController.update);
router.delete('/:id', ArticleController.delete);

export default router;
