import { Schema, model } from 'mongoose';

interface Session {
    user: string;
    lock: boolean;
}

const schema = new Schema<Session>({
    user: {type: String},
    lock: {type: Boolean},
});

const SessionModel = model<Session>('Session', schema);

export default SessionModel;
