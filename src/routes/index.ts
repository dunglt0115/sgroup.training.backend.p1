import newsRouter from './news/news';
import articlesRouter from './articles/articles';
import siteRouter from './site/site';
import meRouter from './me/me';
import loginRouter from './auth/login';
import logoutRouter from './auth/logout';
import { requireAuth, notRequireAuth } from '../middlewares/auth.middleware';

function route(app: any) {
    app.use('/news', requireAuth, newsRouter);
    app.use('/me', requireAuth, meRouter);
    app.use('/articles', requireAuth, articlesRouter);
    app.use('/logout', logoutRouter);
    app.use('/login', notRequireAuth, loginRouter);
    app.use('/', requireAuth, siteRouter);
}

export default route;
