// Manejo del formulario de registro
document.querySelector('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    
    const formData = new FormData(this);
    
    // Enviar los datos al backend
    fetch('/register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  // Asumimos que el backend responde con JSON
    .then(data => {
        if (data.success) {
            alert('Registro exitoso');
            window.location.href = '/inicio_sesion.html';  // Redirigir a la página de inicio de sesión
        } else {
            alert(data.message || 'Error en el registro');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Manejo del formulario de inicio de sesión
document.querySelector('#login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    
    const formData = new FormData(this);
    
    // Enviar los datos al backend
    fetch('/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  // Asumimos que el backend responde con JSON
    .then(data => {
        if (data.success) {
            alert('Inicio de sesión exitoso');
            window.location.href = '/';  // Redirigir a la página de inicio o dashboard
        } else {
            alert(data.message || 'Error en el inicio de sesión');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
