const newsRouter = require('./news');
const articlesRouter = require('./articles');
const siteRouter = require('./site')

function route(app) {
    app.use('/news', newsRouter);
    app.use('/articles', articlesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
