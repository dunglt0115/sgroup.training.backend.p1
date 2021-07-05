import express from 'express';
import {Request, Response} from 'express';
import {ArticleController} from './article.controller';
import {mongooseToObject} from '../../utils/mongoose';
import ArticleModel from '../../models/Articles';
import {JwtAuthenticator} from '../auth/guard/jwtAutheticator.guard';

const router = express.Router();

// Page: Add new article
router.get('/new', (req: Request, res: Response) => {
    return res.render('articles/create');
});

router.post('/create', JwtAuthenticator.getInstance().getAuthenticator, ArticleController.create);

// Page: Edit article
router.get('/:id/edit', async (req: Request, res: Response) => {
    const article = await ArticleModel.findById(req.params.id);
    try {
        return res.render('articles/edit', {
            article: mongooseToObject(article)
        })
    } catch (error) {
        console.log(error);
    }
});

router.patch('/update', ArticleController.updateById);
router.patch('/:id/restore', ArticleController.restoreById);
router.delete('/:id', ArticleController.softDeleteById);
router.delete('/:id/force', ArticleController.hardDeleteById);

// Page: Detail
router.get('/:slug', async (req: Request, res: Response) => {
    const article = await ArticleModel.findOne({slug: req.params.slug});
    try {
        return res.render('articles/detail', {
            article: mongooseToObject(article)
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;
