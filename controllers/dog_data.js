const Dog = require('../models/dog');

exports.registerDog = async (req, res) => {
    const { nombrePerro, edadPerro, pesoPerro, sexo, raza } = req.body;

    try {
        const existingDog = await Dog.findOne({ nombrePerro });
        if (existingDog) {
            return res.status(400).send("El nombre del perro ya está en uso");
        }

        const newDog = new Dog({
            nombrePerro,
            edadPerro, 
            pesoPerro,
            sexo,
            raza,
            dueno: req.session.user.user
        });

        await newDog.save();
        res.status(201).redirect('/perfil');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al registrar el perro");
    }
};