import {Document, Schema, model} from 'mongoose';

export interface ISession extends Document {
    user: string;
    expired: number;
}

const schema = new Schema<ISession>({
    user: String,
    expired: Number
});

const SessionModel = model<ISession>('Session', schema);

export default SessionModel;
