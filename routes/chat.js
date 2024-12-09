const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirige al login si no hay sesión
    }
    res.render('chat', { 
        navbar_addr1: "/profile",
        navbar_addr2: "/profile", 
        navbar_addr3: "/adiestradores",
        navbar_addr4: "/profile",
        navbar_addr5: "/profile",
        navbar_addr6: "/logout",

        navbar_item1: "Perfil",
        navbar_item2: "Perros",
        navbar_item3: "Adiestradores",
        navbar_item4: "Social",
        navbar_item5: "Ajustes",
        navbar_item6: "Cerrar Sesión",

        sub_navbar_add1: "/dog",
        sub_navbar_add2: "/edit_dog_profile",
        sub_navbar_add3: "/feed_lostdog",
        sub_navbar_add4: "/map_only",
        sub_navbar_add5: "/publicaciones",
        sub_navbar_add6: "/user_info",
        sub_navbar_add7: "/edit_user_profile",
        sub_navbar_add8: "/edit_user_photo",

        sub_navbar_item1: "Mis perros",
        sub_navbar_item2: "Añadir perro",
        sub_navbar_item3: "Perros perdidos",
        sub_navbar_item4: "Mapa",
        sub_navbar_item5: "Publicaciones",
        sub_navbar_item6: "Editar perfil",
        sub_navbar_item7: "Cambiar contraseña",
        sub_navbar_item8: "Cambiar foto de perfil",
        
        script: "",
        user: req.session.user, 
        messages: [] });
});

router.post('/send', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Prompt ajustado para respuestas moderadamente largas
        const prompt = `
            Actúa como un experto adiestrador de perros. Responde de manera clara, detallada y útil, pero evita ser excesivamente extenso. Proporciona respuestas que resuelvan directamente la consulta del usuario y, si es necesario, invita al usuario a preguntar más detalles si lo desea. Mensaje del usuario: "${message}"
        `;

        const result = await model.generateContent([prompt]);

        res.json({ reply: result.response.text() });
    } catch (error) {
        console.error('Error al usar Google Gemini:', error);
        res.status(500).json({ error: 'Hubo un problema al generar la respuesta.' });
    }
});

module.exports = router;