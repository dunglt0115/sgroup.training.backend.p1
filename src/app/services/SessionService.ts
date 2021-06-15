import { SessionService } from "../api/session.api";
import { Query } from "mongoose";
import SessionModel, { ISession } from "../models/Sessions";

class Service implements SessionService {
    find(user: {}): Query<ISession[], ISession, {}> {
        return SessionModel.find({});
    }
    create(user: {}): Promise<ISession> {
        return SessionModel.create(user);
    }
    deleteOne(session: {}): any {
        return SessionModel.deleteOne(session);
    }
}

export const SessionServiceImpl = new Service();
