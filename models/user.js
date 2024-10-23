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
    },
    photo: { // Nuevo campo para la foto de perfil
        type: String,
        default: 'perfil_con_perro.png'
    }
});

module.exports = mongoose.model("User", userSchema);