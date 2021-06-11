import { NextFunction, Request, Response } from "express";
import { ILoginDTO } from "../../dto/auth/login.dto";

export function ValidateLogin(req: Request, res: Response, next: NextFunction) {
    const body: ILoginDTO = req.body;
    let errs: string[] = [];

    if (!body.email || !body?.email.match(/\S+@\S+\.\S+/)) {
        errs.push("Wrong email format!");
    }

    if (!body.password || !body?.password.match(/^.{6,}/)) {
        errs.push("Wrong password format!");
    }

    if (errs.length > 0) {
        res.render('login', {
            errs: errs,
            values: body,
        });
        return;
    }

    return next();
}