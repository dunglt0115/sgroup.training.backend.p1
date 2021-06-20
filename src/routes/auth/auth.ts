import express from 'express';
const router = express.Router();
import { AuthController } from '../../app/controllers/AuthController';
import { ValidateLogin } from '../../validator/auth/login.validator';
import { notRequireAuth } from '../../middlewares/auth.middleware';

router.get('/login', notRequireAuth, AuthController.index);
router.post('/login', ValidateLogin, AuthController.login);
router.get('/register', notRequireAuth, AuthController.register);
router.post('/register', AuthController.create);
router.delete('/logout', AuthController.delete);

export default router;
