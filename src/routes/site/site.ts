// File này để route cho tất cả các site không thuộc một site nào khác
import express from 'express';
const router = express.Router();
const siteController = require('../../app/controllers/SiteController');

router.get('/', siteController.index); // Luôn để thằng cấp cao nhất ở dưới cùng

export default router;
