import express from 'express';
const router = express.Router();

const meController = require('../../app/controllers/MeController');

router.get('/stored/articles', meController.storedArticles);

export default router;
