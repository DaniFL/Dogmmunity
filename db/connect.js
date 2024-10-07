const mongoose = require("mongoose")

const dbConnect = async () => {
    await mongoose
        .connect("mongodb+srv://root:root@dogmunity.buz48.mongodb.net/?retryWrites=true&w=majority&appName=Dogmunity") 
        .then(() => {console.log("Conexión a MongoDB exitosa")
        })

        .catch((error) => 
        console.error("Error al conectar a la base de datos", error)
        )
}

module.exports = dbConnect