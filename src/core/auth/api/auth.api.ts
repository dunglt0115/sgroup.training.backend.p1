import { ILoginDTO } from "../dto/login.dto";

export interface AuthService {
    loginDefault(LoginDTO: ILoginDTO): Promise<string | null>;
    register(LoginDTO: ILoginDTO): Promise<void>;
}
