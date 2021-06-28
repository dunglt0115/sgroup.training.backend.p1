import {NextFunction, Request, Response} from 'express';
import {ILoginDTO} from '../dto/login.dto';
import Joi from 'joi';

const loginSchema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com'] }
        })
        .required(),
    password: Joi.string().min(6).required(),
});

export function validateLoginRequest(req: Request, res: Response, next: NextFunction) {
    let body: ILoginDTO = req.body;

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    
    const { error, value } = loginSchema.validate(body, options);

    if (error) {
        return res.render('login', {
            errs: [`Validation error: ${error.details.map(i => i.message).join(', ')}`],
            values: body
        });
    } else {
        body = value;
        return next();
    }
}
