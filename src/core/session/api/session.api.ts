import { Query } from "mongoose";
import { ISession } from "../../../models/Sessions";

export interface SessionService {
    find(user: {}): Query<ISession[], ISession, {}>;
    create(user: {}): Promise<ISession>;
    deleteOne(session: {}): any;
}
