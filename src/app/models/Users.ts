import { Schema, model } from 'mongoose';

interface User {
    email: string;
    password: string;
}

const schema = new Schema<User>({
    email: {type: String},
    password: {type: String},
}, {
    timestamps: true,
})

const UserModel = model<User>('User', schema);

export default UserModel;
