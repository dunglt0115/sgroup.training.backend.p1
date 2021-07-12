import {Collection} from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../../models/Users';

export default class UserSeed {
    static async run(connection: Collection) {
        const DEFAULT_PWD = bcrypt.hashSync('123456', 10);
        await UserModel.insertMany([
            {
                username: 'demo1@gmail.com',
                password: DEFAULT_PWD
            },
            {
                username: 'demo2@gmail.com',
                password: DEFAULT_PWD
            }
        ]);
    }
}
