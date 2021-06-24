import {Request, Response} from 'express';
import {AuthService} from './api/auth.api';
import {AuthServiceImpl} from './auth.service';
import {envConfig} from '../../env';

class Controller {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    // Login
    login = async (req: Request, res: Response) => {
        const errs: string[] = [];

        try {
            const sessionId = await this.authService.loginDefault(req.body);

            if (!sessionId) {
                errs.push('Someone is using this account.');
                return res.render('login', {
                    errs: errs
                })
            }

            res.cookie('user', sessionId, {
                signed: true,
                httpOnly: true,
                maxAge: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED'))
            });
            return res.redirect('/');
        } catch (error) {
            errs.push(error);
            return res.render('error', {
                errs: errs
            });
        }
    }

    // Register
    create = async (req: Request, res: Response) => {
        const errs: string[] = [];
        try {
            await this.authService.register(req.body);
        } catch (error) {
            errs.push(error);
            return res.render('error', {
                errs: errs
            });
        }

        return res.status(200).json({
            message: 'Register success'
        })
    }
}

export const AuthController = new Controller(AuthServiceImpl);
