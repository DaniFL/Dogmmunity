const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirige al login si no hay sesión
    }
    res.render('chat', { user: req.session.user, messages: [] });
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