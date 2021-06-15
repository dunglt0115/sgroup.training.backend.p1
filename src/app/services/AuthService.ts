import { ILoginDTO } from "../../dto/auth/login.dto";
import { AuthService } from "../api/auth.api";
import UserModel from "../models/Users";
import bcrypt from 'bcrypt';
import { SessionService } from "../api/session.api";
import { SessionServiceImpl } from "./SessionService";

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
        const userId: string = user._id;

        const arr = await this.sessionService.find({});
        let isLoggedIn: boolean = arr.some((user: any, index: number) => {
            return arr[index].user == userId;
        });
        if (isLoggedIn == true) {
            return null;
        }

        const session = await this.sessionService.create({user: userId});
        return session._id;
    }
}

export const AuthServiceImpl = new Service(SessionServiceImpl);
