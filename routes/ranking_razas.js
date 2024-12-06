const express = require('express');
const router = express.Router();
const { getDogBreedRanking } = require('../db/tables/dogs');

// Ruta para mostrar el ranking de razas
router.get('/', async (req, res) => {
    try {
        // Obtener el filtro de género de los parámetros de consulta
        const gender = req.query.gender || null; // Ejemplo: 'Macho' o 'Hembra'

        // Llamar a la función para obtener el ranking de razas
        const breedRanking = await getDogBreedRanking(gender);

        // Renderizar la vista con los datos obtenidos
        res.render('ranking_razas', {
            title: 'Ranking de Razas',
            navbar_addr1: "/",
            navbar_addr2: "/",
            navbar_addr3: "/login",
            navbar_addr4: "/register",
            navbar_addr5: "/about_us",
            navbar_addr6: "/contact_us",
        
            navbar_item1: "Inicio",
            navbar_item2: "Sobre perros",
            navbar_item3: "Iniciar sesión",
            navbar_item4: "Registrate",
            navbar_item5: "Sobre nosotros",
            navbar_item6: "Contacto",
        
            sub_navbar_add1: "/feed_lostdog",
            sub_navbar_add2: "/dog_food_advice",
            sub_navbar_add3: "/dog_vision",
            sub_navbar_add4: "/ranking",
            sub_navbar_add5: "/test_duenno",
        
            sub_navbar_item1: "Perros perdidos",
            sub_navbar_item2: "Alimentación y nutrición",
            sub_navbar_item3: "Simulador de visión perruna",
            sub_navbar_item4: "Rankings",
            sub_navbar_item5: "Test del buen dueño",
            breedRanking, // Pasar el ranking de razas a la vista
            gender:req.query.gender, // Pasar el género seleccionado para mantener el filtro
            user: req.session.user
        });
    } catch (error) {
        console.error('Error al obtener el ranking de razas:', error);
        res.status(500).send('Hubo un error al cargar el ranking de razas.');
    }
});

module.exports = router;
