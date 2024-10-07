/*const User = require("../models/user");
const { getToken, getTokenData } = require("../config/jwt.config")
const template = require('../config/email.template');
const { getTemplate, sendEmail } = require("../config/mail.config");

const signUp = async (req, res) => {
    try{
        //Obtener data de user
        const { name, email, password } = req.body;
        
        
        res.status(201).json({ message: "User created successfully" });
        
        // Verifcar que el usuario no existe
        let user = await User.findOne({name, email}) || null;

        if(user !== null){
            return res.json({
                success: false,
                message: 'El nombre de usuario o el correo ya existen.'
            });
        }

        // Crear un nuevo usuario
        user = new User({ name, email, password });
        // Generar token
        const token = getToken({name, email, password});
        // Obtener un template
        const template = getTemplate(name, token);

        // Enviar email
        await sendEmail(email, "Email de prueba", template);
        await user.save();

        res.json({
            success: true,
            message: 'Usuario registrado correctamente.'
        });

    } catch(error){
        console.log(error);
        return res.json({
            success: false,
            message: 'Error al registrar el usuario.'
        })
    }
}
*/
