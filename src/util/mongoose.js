module.exports = {
    mongoosesToObject: function(mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function(mongoose) { // Xử lý tùy số lượng document trong mongodb database
        return mongoose ? mongoose.toObject() : mongoose;
    }
};
