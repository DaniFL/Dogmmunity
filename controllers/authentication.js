const User = require('../models/user');
const bcrypt = require('bcryptjs'); 

// Función para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const { user, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ user });
        if (existingUser) {
            return res.status(400).send("El nombre de usuario ya está en uso");
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = new User({
            user,
            email,
            password: hashedPassword
        });

        await newUser.save();
        req.session.user = newUser;
        res.status(201).redirect('/perfil');
    } catch (error) {
        res.status(500).send("Error al registrar el usuario");
    }
};

// Función para iniciar sesión
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ user: username });
        if (!user) {
            return res.status(400).send("Usuario no encontrado");
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Contraseña incorrecta");
        }

        // Iniciar sesión (aquí puedes usar sesiones o tokens)
        req.session.user = {
            id: user._id, 
            user: user.user, 
            photo: user.photo,
            email: user.email
        }; 

        req.session.userId = user._id;
        req.session.userName = user.user;

        res.status(200).redirect('/perfil');
    } catch (error) {
        res.status(500).send("Error al iniciar sesión");
    }
};
// Función para actualizar la contraseña del usuario
exports.updateUserPassword = async (req, res) => {
    const { nuevaContrasena } = req.body;
    const userId = req.session.user._id;

    try {
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
        res.status(200).redirect('/perfil');
    } catch (error) {
        res.status(500).send("Error al actualizar la contraseña");
    }
};