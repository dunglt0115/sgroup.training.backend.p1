import newsRouter from './news/news';
import articlesRouter from './articles/articles';
import siteRouter from './site/site';
import meRouter from './me/me';
import loginRouter from './auth/login';
import logoutRouter from './auth/logout';
import authMiddleware from '../middlewares/auth.middleware';

function route(app: any) {
    app.use('/news', authMiddleware.requireAuth, newsRouter);
    app.use('/me', authMiddleware.requireAuth, meRouter);
    app.use('/articles', authMiddleware.requireAuth, articlesRouter);
    app.use('/logout', logoutRouter);
    app.use('/login', authMiddleware.notRequireAuth, loginRouter);
    app.use('/', authMiddleware.requireAuth, siteRouter); // Luôn để trang chủ cuối cùng, để hàm chạy từ trang cấp thấp nhất đến cao nhất
}

export default route;
