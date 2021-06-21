import { NextFunction, Request, Response } from "express";
import { AuthServiceImpl } from "../services/AuthService";
import { AuthService } from "../api/auth.api";
import SessionModel from '../models/Sessions';
import { envConfig } from "../../env";

class Controller {
    private authService: AuthService;
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    // [GET] /login
    index(req: Request, res: Response) {
        return res.render('login');
    }

    // [POST] /login
    login = async (req: Request, res: Response) => {
        let errs: string[] = [];
        try {
            const sessionId = await this.authService.loginDefault(req.body);

            if (!sessionId) {
                errs.push("Someone is using this account.");
                return res.render('login', {
                    errs: errs
                })
            }

            res.cookie('user', sessionId, {
                signed: true,
                httpOnly: true,
                maxAge: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED')),
            });

            return res.redirect('/');
        } catch (error) {
            errs.push(error);
            return res.render('error', {
                errs: errs
            });
        }
    }

    // [GET] /auth/register
    register(req: Request, res: Response) {
        return res.render('register');
    }

    // [POST] /auth/create
    create = async (req: Request, res: Response) => {
        let errs: string[] = [];
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

    // [DELETE] /logout
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const sessionId = req.signedCookies.user;
        
        if (sessionId) {
            await SessionModel.deleteOne({_id: sessionId});
            res.clearCookie("user");
            return res.status(203).json({});
        }
        
        return res.status(200).json({
            message: 'Can not logout'
        });
    }
}

export const AuthController = new Controller(AuthServiceImpl);
