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
async function createUser(user, email, password) {
    try {
        await connectToDb();
        const query = `
            INSERT INTO Usuarios (username, email, password)
            VALUES (@user, @Email, @Password)
        `;
        const request = new sql.Request();
        request.input('user', sql.NVarChar, user);
        request.input('Email', sql.NVarChar, email);
        request.input('Password', sql.NVarChar, password);
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

// Actualizar un usuario
async function updateUser(id, updates) {
    try {
        await connectToDb();
        const fields = Object.keys(updates).map(key => `${key} = @${key}`).join(', ');
        const query = `UPDATE Usuarios SET ${fields} WHERE id = @Id`;
        const request = new sql.Request();
        request.input('Id', sql.UniqueIdentifier, id);
        Object.keys(updates).forEach(key => {
            request.input(key, sql.NVarChar, updates[key]);
        });
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
        request.input('Id', sql.Int, id);
        await request.query(query);
        console.log('Usuario eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar el usuario', error);
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
    deleteUser
};