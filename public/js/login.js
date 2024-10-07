/*document.querySelector('.inicio_form').addEventListener('submit', async function (e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.querySelector('.error');

    errorElement.classList.add('escondido');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (result.success) {
            // Redireccionar al admin si el login es exitoso
            window.location.href = '/admin';
        } else {
            errorElement.textContent = result.message;
            errorElement.classList.remove('escondido');
        }
    } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
        errorElement.textContent = 'Error interno del servidor.';
        errorElement.classList.remove('escondido');
    }
});
*/