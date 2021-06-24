import {Document, Schema, model} from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
}

const schema = new Schema<IUser>({
    email: String,
    password: String
}, {
    timestamps: true
})

const UserModel = model<IUser>('User', schema);

export default UserModel;
