import { NextFunction, Request, Response } from "express";
import { AuthServiceImpl } from "../services/AuthService";
import { AuthService } from "../api/auth.api";
import SessionModel from '../models/Sessions';

class Controller {
    private authService: AuthService;
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    // [GET] /login
    index(req: Request, res: Response) {
        res.render('login');
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
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.redirect('/');
        } catch (error) {
            errs.push(error);
            return res.render('error', {
                errs: errs
            });
        }
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
