const express = require('express');
const router = express.Router();
const articleController = require('../app/controllers/ArticleController');
const validate = require('../validation/book.validate');

router.get('/create', articleController.create);
router.post('/store', validate.validate, articleController.store);
router.get('/:id/edit', articleController.edit);
router.put('/:id', articleController.update);
router.delete('/:id', articleController.delete);
router.get('/:slug', articleController.show);

module.exports = router;
