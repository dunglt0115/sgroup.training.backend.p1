import express from 'express';
import {AuthController} from './auth.controller';
import {validateLoginRequest} from './validator/login.validator';
import {Request, Response} from 'express';

const router = express.Router();

// Page: Login
router.get('/login', (req: Request, res: Response) => {
    return res.render('login');
});

router.post('/login', validateLoginRequest, AuthController.loginWithoutSession);

// Page: Register
router.get('/register', (req: Request, res: Response) => {
    return res.render('register');
});

router.post('/create', AuthController.createNewAccount);

export default router;
