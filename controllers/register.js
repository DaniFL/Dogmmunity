/*document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, email, password })
        });
        const data = await res.text();
        
        if (res.ok) {
            // redireccione a perfil.html
            window.location.href = "/admin";
        } else {
            document.querySelector('.error').classList.remove('escondido');
            document.querySelector('.error').textContent = data;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});
*/
