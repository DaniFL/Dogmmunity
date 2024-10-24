const Dog = require('../models/dog');

exports.registerDog = async (req, res) => {
    const { name, age, weight, sex, breed } = req.body;

    try {
        // Verificar si el perro ya existe
        const existingDog = await Dog.findOne({ name });
        if (existingDog) {
            return res.status(400).send("El nombre del perro ya está en uso");
        }

        // Crear el nuevo perro
        const newDog = new Dog({
            name,
            age, 
            weight,
            sex,
            breed
        });

        await newDog.save();
        res.status(201).redirect('/perfil');
    } catch (error) {
        res.status(500).send("Error al registrar el perro");
    }
};