import express from 'express';
import {Request, Response} from 'express';
import {ArticleController} from './article.controller';
import {mongooseToObject} from '../../utils/mongoose';
import ArticleModel from '../../models/Articles';
import {multerUpload} from '../../middlewares/multer.middleware';

const router = express.Router();

// Page: Add new article
router.get('/create', (req: Request, res: Response) => {
    return res.render('articles/create');
});

router.post('/store', multerUpload, ArticleController.store);

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

router.put('/:id', ArticleController.update);
router.delete('/:id', ArticleController.delete);

// Page: Detail
router.get('/:slug', async (req: Request, res: Response) => {
    const article = await ArticleModel.findOne({slug: req.params.slug});
    try {
        return res.render('articles/show', {
            article: mongooseToObject(article)
        })
    } catch (error) {
        console.log(error);
    }
});

export default router;
