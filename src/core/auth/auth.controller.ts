import {Request, Response} from 'express';
import {AuthService} from './api/auth.api';
import {AuthServiceImpl} from './auth.service';
import {envConfig} from '../../env';

class Controller {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    login = async (req: Request, res: Response) => {
        try {
            const sessionId = await this.authService.loginDefault(req.body);

            if (!sessionId) {
                return res.render('login', {
                    errs: ['Someone is using this account!']
                })
            } else if (sessionId == "wrong email") {
                return res.render('login', {
                    errs: ['You have entered the wrong email!']
                })
            }

            res.cookie('user', sessionId, {
                signed: true,
                httpOnly: true,
                maxAge: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED'))
            });
            return res.redirect('/');
        } catch (error) {
            return res.render('error', {
                errs: [error]
            });
        }
    }

    createNewAccount = async (req: Request, res: Response) => {
        try {
            await this.authService.register(req.body);
        } catch (error) {
            return res.render('error', {
                errs: [error]
            });
        }

        return res.status(200).json({
            message: 'Register success'
        })
    }
}

export const AuthController = new Controller(AuthServiceImpl);
