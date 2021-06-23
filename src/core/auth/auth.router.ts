import express from 'express';
const router = express.Router();
import { AuthController } from './auth.controller';
import { ValidateLogin } from './validator/login.validator';
import { notRequireAuth } from '../../middlewares/auth.middleware';
import { Request, Response } from 'express';
import SessionModel from '../../models/Sessions';

// Auth page
router.get('/login', notRequireAuth, (req: Request, res: Response) => {
    return res.render('login');
});

router.post('/login', ValidateLogin, AuthController.login);

// Register page
router.get('/register', notRequireAuth, (req: Request, res: Response) => {
    return res.render('register');
});

router.post('/create', AuthController.create);

// Logout
router.get('/logout', async (req: Request, res: Response) => {
    console.log('Im logging out');

    const sessionId = req.signedCookies.user;

    if (sessionId) {
        await SessionModel.deleteOne({_id: sessionId});
        return res.status(203).json({});
    }

    return res.status(400).json({
        message: 'Can not logout'
    });
});

export default router;
