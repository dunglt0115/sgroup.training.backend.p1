import express from 'express';
import {Request, Response} from 'express';
import {mongoosesToObject} from '../utils/mongoose';
import Article from '../models/Articles';
import articleRouter from './article/article.router';
import meRouter from './me/me.router';
import authRouter from './auth/auth.router';
import mediaRouter from './media/media.router';

const router = express.Router();

// Other pages
router.use('/me', meRouter);
router.use('/articles', articleRouter);
router.use('/auth', authRouter);
router.use('/media', mediaRouter);

// Home page
router.get('/', async (req: Request, res: Response) => {
    const articles = await Article.find({deleted: false});
    try {
        return res.render('home', {
            articles: mongoosesToObject(articles)
        })
    } catch (error) {
        console.log(error);
    }
})

export default router;
