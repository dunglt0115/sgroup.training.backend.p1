import articlesRouter from './articles/articles';
import siteRouter from './site/site';
import meRouter from './me/me';
import authRouter from './auth/auth';
import { requireAuth } from '../middlewares/auth.middleware';

function route(app: any) {
    app.use('/me', requireAuth, meRouter);
    app.use('/articles', requireAuth, articlesRouter);
    app.use('/auth', authRouter);
    app.use('/', requireAuth, siteRouter);
}

export default route;
