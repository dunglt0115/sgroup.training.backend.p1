import express from 'express';
import {Request, Response} from 'express';
import {ArticleController} from './article.controller';
import {mongooseToObject} from '../../utils/mongoose';
import ArticleModel from '../../models/Articles';

const router = express.Router();

// Page: Add new article
router.get('/new', (req: Request, res: Response) => {
    return res.render('articles/create');
});

router.post('/create', ArticleController.create);

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

router.put('/:id', ArticleController.updateById);
router.delete('/:id', ArticleController.deleteById);

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

// router.put('/:slug', ArticleController.addnewgallery);

export default router;
