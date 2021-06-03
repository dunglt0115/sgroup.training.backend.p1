module.exports.validate = function(req, res, next) {
    let errs = [];
        
    if (!req.body.name) {
        errs.push("Name is required!");
    }

    if (!req.body.image) {
        errs.push("Image is required!");
    }

    if (errs.length > 0) {
        res.render('articles/create', {
            errs: errs,
            values: req.body,
        });
        return;
    }

    next();
}
