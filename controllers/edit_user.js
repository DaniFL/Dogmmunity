// Asegúrate de usar el selector correcto para el formulario con '#formularioContraseña'
document.querySelector('#formularioContraseña').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene que el formulario se envíe como GET
    const nuevaContrasena = document.getElementById('nuevaContrasena').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;

    if (nuevaContrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden. Por favor, intenta nuevamente.');
        return;
    }

    try {
        const res = await fetch('/update-contraseña', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nuevaContrasena })
        });

        const data = await res.text();

        if (res.ok) {
            // Muestra el mensaje de éxito y redirige a la pantalla de inicio después de que el usuario cierre el alert
            alert(data); // Muestra 'Contraseña actualizada con éxito'
            window.location.href = '/perfil'; // Redirige al usuario a la página de inicio
        } else {
            alert(data); // Muestra el mensaje de error si ocurre algún problema
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});
