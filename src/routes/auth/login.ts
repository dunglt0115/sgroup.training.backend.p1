import express from 'express';
const router = express.Router();
import loginController from '../../app/controllers/LoginController';

router.get('/', loginController.index);
router.post('/', loginController.login);

export default router;
