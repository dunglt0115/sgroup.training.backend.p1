import { NextFunction, Request, Response } from "express";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.signedCookies.user) {
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
