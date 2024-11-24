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

async function createDog(dog) {
    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO Dogs (id, name, breed, age, weight, colour, sex, owner_id, photo_dog_perdido)
            VALUES (NEWID(), @name, @breed, @age, @weight, @colour, @sex, @owner_id, @photo_dog_perdido)
        `;
        const request = new sql.Request();
        request.input('name', sql.VarChar, dog.name);
        request.input('breed', sql.VarChar, dog.breed);
        request.input('age', sql.Int, dog.age);
        request.input('weight', sql.Decimal(10, 2), dog.weight);
        request.input('colour', sql.VarChar, dog.colour);
        request.input('sex', sql.VarChar, dog.sex);
        request.input('owner_id', sql.UniqueIdentifier, dog.owner_id);
        request.input('photo_dog_perdido', sql.VarChar, dog.photo_dog_perdido);
        await request.query(query);
        console.log('Perro creado exitosamente');
    } catch (error) {
        console.error('Error al crear el perro', error);
    } finally {
        await sql.close();
    }
}

async function updateDog(id, updates) {
    try {
        await dbConnect();
        const fields = Object.keys(updates).map(key => `${key} = @${key}`).join(', ');
        const query = `UPDATE Dogs SET ${fields} WHERE id = @id`;
        const request = new sql.Request();
        request.input('id', sql.UniqueIdentifier, id);
        Object.keys(updates).forEach(key => {
            request.input(key, sql.VarChar, updates[key]);
        });
        await request.query(query);
        console.log('Perro actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el perro', error);
    } finally {
        await sql.close();
    }
}

async function deleteDog(id) {
    try {
        await dbConnect();
        const query = 'DELETE FROM Dogs WHERE id = @id';
        const request = new sql.Request();
        request.input('id', sql.UniqueIdentifier, id);
        await request.query(query);
        console.log('Perro eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar el perro', error);
    } finally {
        await sql.close();
    }
}

module.exports = {
    createDog,
    updateDog,
    deleteDog
};