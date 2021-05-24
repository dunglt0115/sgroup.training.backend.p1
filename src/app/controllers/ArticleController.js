const Article = require('../models/Articles');
const {mongooseToObject} = require('../../util/mongoose');

class ArticleController {
    // [GET] /articles/:slug
    show(req, res) {
        Article.findOne({slug: req.params.slug})
            .then(article => {
                res.render('articles/show', {
                    article: mongooseToObject(article)
                })
            })
            .catch(err => next(err))
    }

    // [GET] /articles/create
    create(req, res) {
        res.render('articles/create');
    }

    // [POST] /articles/store
    store(req, res) {
        const article = new Article(req.body);
        article.save()
            .then(() => res.redirect('/'))
            .catch(err => {})
    }
}

module.exports = new ArticleController;
