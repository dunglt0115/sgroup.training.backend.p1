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

    // [POST] /
    store(req, res) {
        const article = new Article(req.body);
        article.save()
            .then(() => res.redirect('/')) // method redirect sẽ thêm 1 key location vào phần response header, từ đó browser mới redirect dc
            .catch(err => {})
    }

    // [GET] /articles/:id/edit
    edit(req, res, next) {
        Article.findById(req.params.id)
            .then(article => res.render('articles/edit', {
                article: mongooseToObject(article)
            }))
            .catch(next)
    }

    // [PUT] /articles/:id
    update(req, res, next) {
        Article.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/articles'))
            .catch(next)
    }

    // [DELETE] /articles/:id
    delete(req, res, next) {
        Article.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back')) // back nghĩa là thực hiện xong thì quay về trang ban đầu
            .catch(next)
    }
}

module.exports = new ArticleController;
