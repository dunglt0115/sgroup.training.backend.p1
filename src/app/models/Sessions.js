const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Session = new Schema({
    user: {type: String},
    lock: {type: Boolean},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Session', Session);
