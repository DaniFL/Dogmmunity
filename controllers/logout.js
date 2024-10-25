document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById('logout-btn'); // Asegúrate de que sea logout-btn y no loggout-btn
    
    // Verificación inicial para saber si el botón se detecta correctamente
    console.log("Botón de cerrar sesión cargado", logoutButton);

    logoutButton.addEventListener('click', async function () {
        console.log("Botón de cerrar sesión fue clickeado");

        try {
            const res = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                console.log("Cierre de sesión exitoso");
                // Redirige al usuario a la página de inicio o de login después de cerrar sesión
                window.location.href = '/';
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error en la solicitud de cierre de sesión:', error);
        }
    });
});

