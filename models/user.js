const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status:{
        type: String,
        require:true,
        default: 'UNVERIFIED'
    }
});

module.exports = mongoose.model("User", userSchema);