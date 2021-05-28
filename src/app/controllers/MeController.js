const Article = require('../models/Articles');
const {mongoosesToObject} = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/articles
    storedArticles(req, res) {
        Article.find({})
            .then(articles => res.render('me/stored-articles', {
                articles: mongoosesToObject(articles)
            }))
            .catch(err => next(err))
    }
}

module.exports = new MeController;
