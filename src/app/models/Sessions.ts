import { Document, Schema, model } from 'mongoose';

export interface ISession extends Document {
    user: string;
}

const schema = new Schema<ISession>({
    user: String,
});

const SessionModel = model<ISession>('Session', schema);

export default SessionModel;
