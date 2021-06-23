import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../../models/Users';
import { envConfig } from "../../env";

async function connect() {
    try {
        const DEFAULT_PWD = bcrypt.hashSync('123456', 10);
        await mongoose.connect(envConfig.get('DB_CONNECTION'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connect successfully!");

        await UserModel.deleteMany();
        await UserModel.insertMany([
            {
                email: 'demo1@gmail.com',
                password: DEFAULT_PWD,
            },
            {
                email: 'demo2@gmail.com',
                password: DEFAULT_PWD,
            },
        ]);
    } catch(err) {
        console.log(err);
    }
}

export default {connect};
