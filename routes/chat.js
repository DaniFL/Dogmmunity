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
        const result = await model.generateContent([`Actúa como un adiestrador de perros. ${message}`]);

        res.json({ reply: result.response.text() });
    } catch (error) {
        console.error('Error al usar Google Gemini:', error);
        res.status(500).json({ error: 'Hubo un problema al generar la respuesta.' });
    }
});

module.exports = router;
