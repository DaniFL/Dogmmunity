const sql = require('mssql');

const dbConfig = {
    user: 'admin_dog', 
    password: '%iso1234', 
    server: 'dogmunity-server.database.windows.net', 
    database: 'Dogmunity', 
    options: {
        encrypt: true, 
        trustServerCertificate: false
    }
};

// Conectar a la base de datos
async function connectToDb() {
    try {
        await sql.connect(dbConfig);
        console.log('Conexión a SQL Server exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
    }
}

// Crear tabla de usuarios
async function createTable() {
    try {
        await sql.connect(dbConfig);
        console.log('Conexión a SQL Server exitosa');

        const query = `
            CREATE TABLE Usuarios (
                id INT PRIMARY KEY IDENTITY(1,1),
                username NVARCHAR(50) NOT NULL UNIQUE,
                email NVARCHAR(50) NOT NULL,
                password NVARCHAR(255) NOT NULL
            )
        `;

    /*CREATE TABLE Usuarios (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), 
    username VARCHAR(50) NOT NULL,                 
    email VARCHAR(255) NOT NULL UNIQUE,             
    password VARCHAR(255) NOT NULL                 
    );
    */

        await sql.query(query);
        console.log('Tabla Usuarios creada exitosamente');
        
    } catch (error) {
        console.error('Error al crear la tabla', error);
    } finally {
        await sql.close();
    }
}

// Eliminar tabla de usuarios
async function deleteTable() {
    try {
        await sql.connect(dbConfig);
        console.log('Conexión a SQL Server exitosa');

        const query = 'DROP TABLE Usuarios';
        await sql.query(query);
        console.log('Tabla Usuarios eliminada exitosamente');

    } catch (error) {
        console.error('Error al eliminar la tabla', error);
    } finally {
        await sql.close();
    }
}

// Crear un nuevo usuario
async function createUser(user, email, password, verificationToken) {
    try {
        await connectToDb();
        const query = `
            INSERT INTO Usuarios (username, email, password,is_verified, verification_token)
            VALUES (@user, @Email, @Password, @IsVerified, @VerificationToken)
        `;
        const request = new sql.Request();
        request.input('user', sql.NVarChar, user);
        request.input('Email', sql.NVarChar, email);
        request.input('Password', sql.NVarChar, password);
        request.input('IsVerified',sql.Bit, 0);
        request.input('VerificationToken',sql.NVarChar,verificationToken);
        await request.query(query);
        console.log('Usuario creado exitosamente');
    } catch (error) {
        console.error('Error al crear el usuario', error);
    } finally {
        await sql.close();
    }
}

// Obtener un usuario por su ID
async function getUserById(id) {
    try {
        await connectToDb();
        const query = 'SELECT * FROM Usuarios WHERE id = @Id';
        const request = new sql.Request();
        request.input('Id', sql.UniqueIdentifier, id);
        const result = await request.query(query);
        return result.recordset[0];
    } catch (error) {
        console.error('Error al obtener el usuario', error);
    } finally {
        await sql.close();
    }
}

// Obtener un usuario por su nombre de usuario
async function getUserByUsername(username) {
    try {
        await connectToDb();
        const query = 'SELECT * FROM Usuarios WHERE username = @Username';
        const request = new sql.Request();
        request.input('Username', sql.NVarChar, username);
        const result = await request.query(query);
        return result.recordset[0];
    } catch (error) {
        console.error('Error al obtener el usuario', error);
    } finally {
        await sql.close();
    }
}
// Obtener un usuario por su token de verificación
async function getUserByToken(token) {
    try {
        await connectToDb(); 
        const query = 'SELECT * FROM Usuarios WHERE verification_token = @Token';
        const request = new sql.Request();
        request.input('Token', sql.NVarChar, token); 
        const result = await request.query(query);
        return result.recordset[0];
    } catch (error) {
        console.error('Error al obtener el usuario por token', error);
    } finally {
        await sql.close();
    }
}


// Actualizar un usuario
async function updateUser(id, data) {
    try {
        await connectToDb();
        
        let query = 'UPDATE Usuarios SET ';
        const request = new sql.Request();
        
        if (data.nombre !== undefined) {
            query += 'username = @Nombre, ';
            request.input('Nombre', sql.NVarChar, data.nombre);
        }
        if (data.email !== undefined) {
            query += 'email = @Email, ';
            request.input('Email', sql.NVarChar, data.email);
        }
        if (data.password !== undefined) {
            query += 'password = @Password, ';
            request.input('Password', sql.NVarChar, data.password);
        }
        if (data.photo_path !== undefined) {
            query += 'photo_path = @PhotoPath, ';
            request.input('PhotoPath', sql.NVarChar, data.photo_path);
        }
        if (data.is_verified !== undefined) {
            query += 'is_verified = @IsVerified, ';
            request.input('IsVerified', sql.Bit, data.is_verified);
        }
        if (data.verification_token !== undefined) {
            query += 'verification_token = @VerificationToken, ';
            request.input('VerificationToken', sql.NVarChar, data.verification_token);
        }
        
        // Remove the last comma and space
        query = query.slice(0, -2);
        query += ' WHERE id = @Id';
        
        request.input('Id', sql.UniqueIdentifier, id);
        await request.query(query);
        
        console.log('Usuario actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el usuario', error);
    } finally {
        await sql.close();
    }
}

// Eliminar un usuario
async function deleteUser(id) {
    try {
        await connectToDb();
        const query = 'DELETE FROM Usuarios WHERE id = @Id';
        const request = new sql.Request();
        request.input('Id', sql.UniqueIdentifier, id);
        await request.query(query);
        console.log('Usuario eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar el usuario', error);
    } finally {
        await sql.close();
    }
}

// Marcar usuario como verificado
async function verifyUser(userId) {
    try {
        await connectToDb();
        const query = 'UPDATE Usuarios SET is_verified = 1 WHERE id = @Id';
        const request = new sql.Request();
        request.input('Id', sql.UniqueIdentifier, userId);
        await request.query(query);
    } catch (error) {
        console.error('Error al verificar el usuario', error);
    } finally {
        await sql.close();
    }
}

module.exports = {
    connectToDb,
    createTable,
    deleteTable,
    createUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
    getUserByToken,
    verifyUser
};