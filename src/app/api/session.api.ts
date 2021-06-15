import { Query } from "mongoose";
import { ISession } from "../models/Sessions";

export interface SessionService {
    find({}): Query<ISession[], ISession, {}>;
    create(user: {}): Promise<ISession>;
}
