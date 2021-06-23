export interface ILoginDTO {
    email: string;
    password: string;
}

export function LoginDTO(body: any): ILoginDTO {
    return {
        email: body.email,
        password: body.password
    }
}
