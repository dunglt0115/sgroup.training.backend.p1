import mongoose from 'mongoose';
import {envConfig} from '../../env';

async function connect() {
    try {
        await mongoose.connect(envConfig.get('DB_CONNECTION'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect successfully!');
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

export default {connect};
