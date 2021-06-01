const mongoose = require('mongoose');

// User
const UserModel = require('../../app/models/Users');
const bcrypt = require('bcrypt');

async function connect() {
    try {
        const DEFAULT_PWD = bcrypt.hashSync('123456', 10);
        await mongoose.connect('mongodb://localhost:27017/demo_sgroup', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log ("Connect successfully!")

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
    } catch (err) {
        console.log (err);
    }
}

module.exports = { connect }; // Không nhất thiết phải bỏ vào trong object, nhưng bỏ vào thì lúc require bên file chính, biến nhận được sẽ là object, khá tiện
