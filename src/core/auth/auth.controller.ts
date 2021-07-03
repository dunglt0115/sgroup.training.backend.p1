import {Request, Response} from 'express';
import {AuthService} from './api/auth.api';
import {AuthServiceImpl} from './auth.service';
import {envConfig} from '../../env';

class Controller {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    /**
     * @deprecated This function is no longer using
     */
    login = async (req: Request, res: Response) => {
        try {
            const sessionId = await this.authService.loginDefault(req.body);

            if (!sessionId) {
                return res.status(400).json({
                    message: 'Someone is using this account!'
                });
            } else if (sessionId == 'wrong email') {
                return res.status(400).json({
                    message: 'You have entered the wrong email!'
                });
            }

            res.cookie('user', sessionId, {
                signed: true,
                httpOnly: true,
                maxAge: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED'))
            });
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }

        return res.status(200).json({
            message: 'Login successfully'
        });
    }

    loginWithoutSession = async (req: Request, res: Response) => {
        const userInfo = await this.authService.loginWithoutSession(req.body);

        try {
            return res.status(200).json({
                userInfo
            });
        } catch (error) {
            return res.status(error.code).json({
                message: error.message,
                trace: error.stack
            })
        }
    }

    createNewAccount = async (req: Request, res: Response) => {
        try {
            await this.authService.register(req.body);
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }

        return res.status(200).json({
            message: 'Register successfully'
        })
    }
}

export const AuthController = new Controller(AuthServiceImpl);
