var mongoose = require('mongoose');

var adminModel = new mongoose.Schema({
    login: {
        type: String,
        required:true,
        unique: true,
    },
    password: {
        type: String,
        required : [true,"password is required"]
    }
});

module.exports = mongoose.model('Admin', adminModel);