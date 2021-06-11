import { Request } from "express";

export interface ILoginDTO {
    email: string;
    password: string;
}

export function LoginDTO(req: Request): ILoginDTO {
    return {
        email: req.body.email,
        password: req.body.password
    }
}
