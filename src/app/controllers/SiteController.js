const Article = require('../models/Articles');
const {mongoosesToObject} = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res) {
        Article.find({}) // Chọc vào model
            .then(articles => { // Có dữ liệu từ model
                res.render('home', { // Lấy dữ liệu đưa sang view
                    articles: mongoosesToObject(articles)
                })
            })
            .catch(err => next(err));
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;
