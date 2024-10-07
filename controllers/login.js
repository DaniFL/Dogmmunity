document.querySelector('inicio_form').addEventListener('submit', async (e) => {
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
        const data = await res.text();
        
        if (res.ok) {
            window.location.href = '/'; // Redirige al inicio después de un login exitoso
        } else {
            document.querySelector('.error').classList.remove('escondido');
            document.querySelector('.error').textContent = data;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});
