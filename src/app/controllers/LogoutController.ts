import { NextFunction, Request, Response } from "express";
import SessionModel from '../models/Sessions';

class LogoutController {
    // [DELETE] /logout
    async delete(req: Request, res: Response, next: NextFunction) {
        const sessionId = req.signedCookies.user;
        
        if (sessionId) {
            await SessionModel.deleteOne({_id: sessionId});
            await res.clearCookie("user");
            return res.status(203).json({});
        }
        
        return res.status(200).json({
            message: 'Can not logout'
        });
    }
}

export default new LogoutController;
