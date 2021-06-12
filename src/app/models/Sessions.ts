import { Schema, model } from 'mongoose';

interface Session {
    user: string;
}

const schema = new Schema<Session>({
    user: {type: String},
});

const SessionModel = model<Session>('Session', schema);

export default SessionModel;
