document.addEventListener('DOMContentLoaded', () => {
    const formNombrePerros = document.getElementById('formNombrePerros');
    const formEdadPerros = document.getElementById('formEdadPerros');
    const formPesoPerros = document.getElementById('formPesoPerros');
    const formSexoPerros = document.getElementById('formSexoPerros');
    const formRazaPerros = document.getElementById('formRazaPerros');
    const botonGuardar = document.querySelector('.botonesGuardarPerro');

    // Al hacer clic en el botón de guardar
    botonGuardar.addEventListener('click', async (e) => {
        e.preventDefault(); 

        // Crear el objeto con los datos del formulario
        const data = {
            nombrePerro: formNombrePerros.nombrePerro.value,
            edadPerro: formEdadPerros.edadPerro.value,
            pesoPerro: formPesoPerros.pesoPerro.value,
            sexo: formSexoPerros.sexo.value,
            raza: formRazaPerros.raza.value
        };

        try {
            const response = await fetch('/agregarPerro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.href = '/perfil';
            } else {
                alert('Error al guardar el perro');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
