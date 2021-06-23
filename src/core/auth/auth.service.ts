import { ILoginDTO } from "./dto/login.dto";
import { AuthService } from "./api/auth.api";
import UserModel from "../../models/Users";
import bcrypt from 'bcrypt';
import { SessionService } from "../session/api/session.api";
import { SessionServiceImpl } from "../session/session.service";
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
        
        // Check if this account is currently unused
        if (sessionFromDB.length == 0) {
            const session = await this.sessionService.create({
                user: user._id,
                expired: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED')),
            });
            return session._id;
        }

        // Check working session
        let sessionTime: number = sessionFromDB.reduce((acc, val, index) => {
            return Date.now() - sessionFromDB[index].expired;
        }, 0);

        if (sessionTime > 0) { // Session timeout
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

    async register(LoginDTO: ILoginDTO): Promise<void> {
        const existedUser = await UserModel.findOne({email: LoginDTO.email});
        if (existedUser) {
            throw new Error(`This user has already been existed`);
        }

        LoginDTO.password = bcrypt.hashSync(LoginDTO.password, 10);
        const newUser = new UserModel(LoginDTO);
        await newUser.save();
        return;
    }
}

export const AuthServiceImpl = new Service(SessionServiceImpl);
