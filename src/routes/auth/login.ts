import express from 'express';
const router = express.Router();

const loginController = require('../../app/controllers/LoginController');

router.get('/', loginController.index);
router.post('/', loginController.login);

export default router;
