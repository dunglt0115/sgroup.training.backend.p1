import {NextFunction, Request, Response} from 'express';
import SessionModel from '../models/Sessions';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.signedCookies.user;

    if (!sessionId) {
        return res.redirect('/auth/login');
    }

    const currentUserSession = await SessionModel.findById(sessionId);

    if (!currentUserSession) {
        res.clearCookie('user');
        return res.redirect('/auth/login');
    }

    if (Date.now() - currentUserSession.expired > 0) {
        res.clearCookie('user');
        await SessionModel.deleteOne({_id: sessionId});
        return res.redirect('/auth/login');
    }

    return next();
};

export const notRequireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.signedCookies.user) {
        return res.redirect('/');
    }

    return next();
};
