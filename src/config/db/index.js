const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/demo_sgroup', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log ("Connect successfully!")
    } catch (err) {
        console.log (err);
    }
}

module.exports = { connect }; // Không nhất thiết phải bỏ vào trong object, nhưng bỏ vào thì lúc require bên file chính, biến nhận được sẽ là object, khá tiện
