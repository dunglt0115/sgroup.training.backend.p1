import express from 'express';
const router = express.Router();

const logoutController = require('../../app/controllers/LogoutController');

router.delete('/', logoutController.delete);

export default router;
