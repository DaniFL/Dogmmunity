const express = require("express");
const router = express.Router();
const { getUserByToken, verifyUser } = require("../db/tables/users");

router.get("/:token", async (req, res, next) => {
    const { token } = req.params;

    try {
        // Buscar el usuario por token
        const user = await getUserByToken(token);
        if (!user) {
            // Renderiza la vista con error si no hay usuario con ese token
            return res.render("verify", { success: false });
        }

        // Marcar la cuenta como verificada
        await verifyUser(user.id);

        // Renderiza la vista con éxito
        res.render("verify", { success: true });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
