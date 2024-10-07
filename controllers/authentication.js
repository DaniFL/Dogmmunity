const bcrypt = require('bcryptjs');
const User = require('user');

// Registro de usuario
exports.register = async (req, res) => {
    const { user, email, password } = req.body;

    try {
        // Comprobar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ user }, { email }] });
        if (existingUser) {
            return res.json({ success: false, message: 'El nombre de usuario o el correo ya existen.' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({ user, email, password: hashedPassword });
        await newUser.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.json({ success: false, message: 'Error al registrar el usuario.' });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario por su nombre
        const user = await User.findOne({ user: username });
        if (!user) {
            return res.json({ success: false, message: 'Usuario no encontrado.' });
        }

        // Comprobar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Contraseña incorrecta.' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.json({ success: false, message: 'Error al iniciar sesión.' });
    }
};