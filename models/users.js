const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    FullName: {
        type: String,
        required: true,
        min: 6
    },
    UserName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    Password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }

});

module.exports = mongoose.model('Users', userSchema);