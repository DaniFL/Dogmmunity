const mongoose = require('mongoose');

const PerroSchema = new mongoose.Schema({
    nombrePerro: { 
        type: String, 
        required: true 
    },
    edadPerro: { 
        type: Date, 
        required: true 
    },
    pesoPerro: { 
        type: Number, 
        required: true 
    },
    sexo: { 
        type: String, 
        required: true 
    },
    raza: { 
        type: String, 
        required: true 
    },
    dueno: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: false 
    }
});

const Perro = mongoose.model("Perro", PerroSchema);
module.exports = Perro;