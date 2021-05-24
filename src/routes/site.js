// File này để route cho tất cả các site không thuộc một site nào khác
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/', siteController.index); // Luôn để thằng cấp cao nhất ở dưới cùng

module.exports = router;
