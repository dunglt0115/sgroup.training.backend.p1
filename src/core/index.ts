import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { requireAuth, notRequireAuth} from '../middlewares/auth.middleware';
import { SessionTimeout } from '../middlewares/session.middleware';
import { mongoosesToObject } from '../utils/mongoose';
import Article from '../models/Articles';
import articleRouter from './article/article.router';
import meRouter from './me/me.router';
import authRouter from './auth/auth.router';

const router = express.Router();

// Home page
router.get('/', requireAuth, SessionTimeout.checkSession, (req: Request, res: Response, next: NextFunction) => {
    Article.find({})
        .then(articles => {
            res.render('home', {
                articles: mongoosesToObject(articles)
            })
        })
        .catch(next);
})

// Other pages
router.use('/me', requireAuth, meRouter);
router.use('/articles', requireAuth, articleRouter);
router.use('/auth', notRequireAuth, authRouter);

export default router;
