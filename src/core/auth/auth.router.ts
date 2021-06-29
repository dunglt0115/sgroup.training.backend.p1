import express from 'express';
import {AuthController} from './auth.controller';
import {validateLoginRequest} from './validator/login.validator';
import {notRequireAuth} from '../../middlewares/auth.middleware';
import {Request, Response} from 'express';
import SessionModel from '../../models/Sessions';

const router = express.Router();

// Page: Login
router.get('/login', notRequireAuth, (req: Request, res: Response) => {
    return res.render('login');
});

router.post('/login', validateLoginRequest, AuthController.login);

// Page: Register
router.get('/register', notRequireAuth, (req: Request, res: Response) => {
    return res.render('register');
});

router.post('/create', AuthController.createNewAccount);

// Logout
router.get('/logout', async (req: Request, res: Response) => {
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
