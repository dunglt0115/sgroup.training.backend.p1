import express from 'express';
const router = express.Router();
import logoutController from '../../app/controllers/LogoutController';

router.delete('/', logoutController.delete);

export default router;
