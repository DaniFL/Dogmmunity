// post_register.js

document.addEventListener("registro_form", () => {
  const usernameInput = document.getElementById("user");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorElement = document.querySelector(".error");

  usernameInput.addEventListener("input", async () => {
    const username = usernameInput.value;
    const response = await fetch(`/validate/username?username=${username}`);
    const result = await response.json();
    if (result.error) {
      errorElement.textContent = result.error;
      errorElement.classList.remove("escondido");
    } else {
      errorElement.classList.add("escondido");
    }
  });

  emailInput.addEventListener("input", () => {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorElement.textContent = "El email no es válido.";
      errorElement.classList.remove("escondido");
    } else {
      errorElement.classList.add("escondido");
    }
  });

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      errorElement.textContent =
        "La contraseña debe tener al menos 8 caracteres.";
      errorElement.classList.remove("escondido");
    } else if (!hasUpperCase) {
      errorElement.textContent =
        "La contraseña debe tener al menos una letra mayúscula.";
      errorElement.classList.remove("escondido");
    } else if (!hasLowerCase) {
      errorElement.textContent =
        "La contraseña debe tener al menos una letra minúscula.";
      errorElement.classList.remove("escondido");
    } else if (!hasNumbers) {
      errorElement.textContent = "La contraseña debe tener al menos un número.";
      errorElement.classList.remove("escondido");
    } else if (!hasSpecialChars) {
      errorElement.textContent =
        "La contraseña debe tener al menos un carácter especial.";
      errorElement.classList.remove("escondido");
    } else {
      errorElement.classList.add("escondido");
    }
  });
});

/* const sql = require('mssql');


dbConnect();

// Obtener todos los nombres de usuario
async function getAllUsernames() {
    try {
        await connectToDb();
        const query = 'SELECT username FROM Usuarios';
        const result = await sql.query(query);
        return result.recordset.map(record => record.username);
    } catch (error) {
        console.error('Error al obtener los nombres de usuario', error);
        return [];
    } finally {
        await sql.close();
    }
}

// Función para validar el nombre de usuario
async function validateUsername(username) {
    const badWords = ["palabramalsonante1", "palabramalsonante2", "palabramalsonante3"];
    const usedUsernames = await getAllUsernames();

    for (let word of badWords) {
        if (username.includes(word)) {
            return "El nombre de usuario contiene palabras mal sonantes.";
        }
    }
    if (usedUsernames.includes(username)) {
        return "El nombre de usuario ya está en uso.";
    }
    return "El nombre de usuario es válido.";
}

// Función para validar el email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        return "El email es válido.";
    } else {
        return "El email no es válido.";
    }
}

// Función para validar la contraseña
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (!hasUpperCase) {
        return "La contraseña debe tener al menos una letra mayúscula.";
    }
    if (!hasLowerCase) {
        return "La contraseña debe tener al menos una letra minúscula.";
    }
    if (!hasNumbers) {
        return "La contraseña debe tener al menos un número.";
    }
    if (!hasSpecialChars) {
        return "La contraseña debe tener al menos un carácter especial.";
    }
    return "La contraseña es segura.";
}

// Función principal para analizar la entrada del usuario
async function analyzeInput(username, email, password) {
    console.log(await validateUsername(username));
    console.log(validateEmail(email));
    console.log(validatePassword(password));
}

// Ejemplo de uso
const username = prompt("Introduce tu nombre de usuario:");
const email = prompt("Introduce tu email:");
const password = prompt("Introduce tu contraseña:");

analyzeInput(username, email, password); */
