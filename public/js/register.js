/*document.querySelector('.registro_form').addEventListener('submit', async function (e) {
    e.preventDefault(); 

    const user = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.querySelector('.error');

    errorElement.classList.add('escondido');

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, email, password })
        });

        const result = await response.json();
        if (result.success) {
            // Redireccionar al admin si el registro es exitoso
            window.location.href = '/admin';
        } else {
            errorElement.textContent = result.message;
            errorElement.classList.remove('escondido');
        }
    } catch (error) {
        console.error('Error en la solicitud de registro:', error);
        errorElement.textContent = 'Error interno del servidor.';
        errorElement.classList.remove('escondido');
    }
});
*/