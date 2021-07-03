import {ILoginDTO} from '../dto/login.dto';
import {IUserInfo} from '../dto/userInfo.dto';

export interface AuthService {
    loginDefault(LoginDTO: ILoginDTO): Promise<string | null>;
    loginWithoutSession(LoginDTO: ILoginDTO): Promise<{info: IUserInfo, accessToken: string}>;
    register(LoginDTO: ILoginDTO): Promise<void>;
}
