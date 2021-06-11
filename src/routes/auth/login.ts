import express from 'express';
const router = express.Router();
import loginController from '../../app/controllers/LoginController';
import { ValidateLogin } from '../../validator/auth/login.validator';

router.get('/', loginController.index);
router.post('/', ValidateLogin, loginController.login);

export default router;
