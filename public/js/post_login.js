/*document.querySelector('#inicio_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json(); // Cambiado a res.json() para manejar la respuesta JSON
        
        if (res.ok) {
            window.location.href = '/profile';
        } else {
            document.querySelector('.error').classList.remove('escondido');
            document.querySelector('.error').textContent = data.message || 'Error en el inicio de sesión';
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        document.querySelector('.error').classList.remove('escondido');
        document.querySelector('.error').textContent = 'Error en la solicitud. Por favor, inténtalo nuevamente.';
    }
});*/