const Article = require('../models/Articles');
const {mongoosesToObject} = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res) {
        let page = parseInt(req.query.page) || 1;
        let itemPerPage = 3;
        let start = (page - 1) * itemPerPage;
        let end = page * itemPerPage;

        Article.find({}) // Chọc vào model
            .then(articles => { // Có dữ liệu từ model
                res.render('home', { // Lấy dữ liệu đưa sang view
                    articles: mongoosesToObject(articles).slice(start, end) // slice for pagination
                })
            })
            .catch(err => next(err));
    }
}

module.exports = new SiteController;
