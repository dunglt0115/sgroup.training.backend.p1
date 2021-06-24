import express from 'express';
const router = express.Router();
import {Request, Response, NextFunction} from 'express';
import {ArticleController} from './article.controller';
import {mongooseToObject} from '../../utils/mongoose';
import ArticleModel from '../../models/Articles';

// Page: Add new article
router.get('/create', (req: Request, res: Response, next: NextFunction) => {
    res.render('articles/create');
});

// Page: Edit article
router.get('/:id/edit', (req: Request, res: Response, next: NextFunction) => {
    ArticleModel.findById(req.params.id)
        .then(article => res.render('articles/edit', {
            article: mongooseToObject(article)
        }))
        .catch(next)
});

// Page: Detail
router.get('/:slug', (req: Request, res: Response, next: NextFunction) => {
    ArticleModel.findOne({slug: req.params.slug})
        .then(article => {
            res.render('articles/show', {
                article: mongooseToObject(article)
            })
        })
        .catch(next)
});

router.post('/store', ArticleController.store);
router.put('/:id', ArticleController.update);
router.delete('/:id', ArticleController.delete);

export default router;
