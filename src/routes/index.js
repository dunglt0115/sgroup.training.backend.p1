const newsRouter = require('./news');
const articlesRouter = require('./articles');
const siteRouter = require('./site')
const meRouter = require('./me');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const authMiddleware = require('../middlewares/auth.middleware');

function route(app) {
    app.use('/news', authMiddleware.requireAuth, newsRouter);
    app.use('/me', authMiddleware.requireAuth, meRouter);
    app.use('/articles', authMiddleware.requireAuth, articlesRouter);
    app.use('/logout', logoutRouter);
    app.use('/login', authMiddleware.notRequireAuth, loginRouter);
    app.use('/', authMiddleware.requireAuth, siteRouter); // Luôn để trang chủ cuối cùng, để hàm chạy từ trang cấp thấp nhất đến cao nhất
}

module.exports = route;
