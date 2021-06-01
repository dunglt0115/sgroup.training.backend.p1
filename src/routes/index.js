const newsRouter = require('./news');
const articlesRouter = require('./articles');
const siteRouter = require('./site')
const meRouter = require('./me');
const loginRouter = require('./login');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/articles', articlesRouter);
    app.use('/login', loginRouter);
    app.use('/', siteRouter); // Luôn để trang chủ cuối cùng, để hàm chạy từ trang cấp thấp nhất đến cao nhất
}

module.exports = route;
