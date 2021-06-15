import { ILoginDTO } from "src/dto/auth/login.dto";

export interface AuthService {
    loginDefault(LoginDTO: ILoginDTO): Promise<string | null>;
}
