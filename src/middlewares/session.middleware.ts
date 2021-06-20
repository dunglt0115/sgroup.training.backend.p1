import { NextFunction, Request, Response } from "express";
import { SessionService } from "../app/api/session.api";
import { SessionServiceImpl } from "../app/services/SessionService";
import { envConfig } from "../env";

class Controller {
    private sessionService: SessionService;
    constructor(sessionService: SessionService) {
        this.sessionService = sessionService;
    }

    checkSession = async (req: Request, res: Response, next: NextFunction) => {
        const sessionId: any = req.signedCookies.user;
        const sessionFromDB = await this.sessionService.find({_id: sessionId});
        let alert = [];

        // Check if it's your turn to break
        let isWorking: boolean = sessionFromDB.some((session, index) => {
            return sessionFromDB[index]._id == sessionId;
        });

        if (isWorking == false) {
            res.clearCookie("user");
            alert.push(`Your session has expired. Please login again after ${Number.parseInt(envConfig.get('SESSION_EXPIRED'))/1000} seconds`)
            return res.render('login', {
                errs: alert
            })
        }

        return next();
    }
}

export const SessionTimeout = new Controller(SessionServiceImpl);
