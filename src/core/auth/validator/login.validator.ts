import {NextFunction, Request, Response} from 'express';
import {ILoginDTO} from '../dto/login.dto';

export function ValidateLogin(req: Request, res: Response, next: NextFunction) {
    const body: ILoginDTO = req.body;
    const errs: string[] = [];

    if (!body.email) {
        errs.push('Enter your email!');
    } else if (!body?.email.match(/\S+@\S+\.\S+/)) {
        errs.push('Wrong email format!');
    }

    if (!body.password) {
        errs.push('Enter your password!');
    } else if (!body?.password.match(/^.{6,}/)) {
        errs.push('Wrong password!');
    }

    if (errs.length > 0) {
        res.render('login', {
            errs: errs,
            values: body
        });
        return;
    }

    return next();
}
