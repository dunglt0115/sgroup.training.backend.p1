import { ILoginDTO } from "../../dto/auth/login.dto";
import { AuthService } from "../api/auth.api";
import UserModel from "../models/Users";
import bcrypt from 'bcrypt';
import { SessionService } from "../api/session.api";
import { SessionServiceImpl } from "./SessionService";
import { envConfig } from "../../env";

class Service implements AuthService {
    private sessionService: SessionService;
    constructor(sessionService: SessionService) {
        this.sessionService = sessionService;
    }

    async loginDefault(LoginDTO: ILoginDTO): Promise<string | null> {
        const user = await UserModel.findOne({email: LoginDTO.email});
        if (!user || !bcrypt.compareSync(LoginDTO.password, user.password)) {
            return null;
        }

        const sessionFromDB = await this.sessionService.find({user: user._id});
        
        // Acc chưa có người đăng nhập
        if (sessionFromDB.length == 0) {
            const session = await this.sessionService.create({
                user: user._id,
                expired: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED')),
            });
            return session._id;
        }

        // Kiểm tra phiên đăng nhập
        let sessionTime: number = sessionFromDB.reduce((acc, val, index) => {
            return Date.now() - sessionFromDB[index].expired;
        }, 0);

        if (sessionTime > 0) { // Hết hạn phiên làm việc
            await this.sessionService.deleteOne({user: user._id});
            const session = await this.sessionService.create({
                user: user._id,
                expired: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED')),
            });
            return session._id;
        } else {
            return null;
        }
    }
}

export const AuthServiceImpl = new Service(SessionServiceImpl);
