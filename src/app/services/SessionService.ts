import { SessionService } from "../api/session.api";
import { Query } from "mongoose";
import SessionModel, { ISession } from "../models/Sessions";

class Service implements SessionService {
    find({}): Query<ISession[], ISession, {}> {
        return SessionModel.find({});
    }
    create(user: {}): Promise<ISession> {
        return SessionModel.create(user);
    }
}

export const SessionServiceImpl = new Service();
