import express from 'express';
const router = express.Router();

const newsController = require('../../app/controllers/NewsController');

router.get('/:slug', newsController.show);
router.get('/', newsController.index);
// Ở đây không để /news luôn là vì file này là file module của file khác, nó là file cấp con
// File khác để /news, file này chỉ cần để / là js sẽ tự hiểu
// Ghi ngược lại cũng được nhưng sẽ không rõ ràng bằng

export default router;
