// Asegúrate de usar el selector correcto para el formulario de foto con '#formularioFoto'
document.querySelector('#formularioFoto').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe como GET

    const fotoSeleccionada = document.querySelector('input[name="fotoPerfil"]:checked').value;

    try {
        const res = await fetch('/edit_user_photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fotoPerfil: fotoSeleccionada })
        });

        const data = await res.text();

        if (res.ok) {
            // Muestra el mensaje de éxito y redirige al perfil después de que el usuario cierre el alert
            alert('Foto de perfil actualizada con éxito');
            window.location.href = '/profile'; // Redirige al perfil
        } else {
            alert('Hubo un problema al actualizar la foto: ' + data);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Por favor, inténtalo nuevamente.');
    }
});