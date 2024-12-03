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
            INSERT INTO Dogs (id, name, breed, age, weight, colour, sex, owner_id, photo_dog_perdido, is_lost)
            VALUES (NEWID(), @name, @breed, @age, @weight, @colour, @sex, @owner_id, @photo_dog_perdido, @is_lost)
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
        request.input('is_lost', sql.TinyInt, dog.is_lost);
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


// Obtener todos los perros perdidos
async function getLostDogs() {
    try {
        await connectToDb();
        const query = 'SELECT * FROM Dogs WHERE is_lost = 1';
        const request = new sql.Request();
        const result = await request.query(query);
        return result.recordset;
        console.log('Perros perdidos obtenidos exitosamente');
    } catch (error) {
        console.error('Error al obtener los perros perdidos', error);
    } finally {
        await sql.close();
    }
}

//Obtener los perros que tiene un user
async function getDogsIdByUserId(id) {
    try {
        await connectToDb();
        const query = 'SELECT id FROM Dogs WHERE owner_id = @id';
        const request = new sql.Request();
        request.input('id', sql.UniqueIdentifier, id);
        const result = await request.query(query);
        return result.recordset;
        console.log('Perros que tiene un usuario por su id obtenidos exitosamente');
    } catch (error) {
        console.error('Error al obtener los perros del usuario', error);
    } finally {
        await sql.close();
    }
}

//Obtener un perro por su id
async function getDogById(id) {
    try {
        await connectToDb();
        const query = 'SELECT * FROM Dogs WHERE id = @id';
        const request = new sql.Request();
        request.input('id', sql.UniqueIdentifier, id);
        const result = await request.query(query);
        return result.recordset[0];
        console.log('Perro obtenido exitosamente');
    } catch (error) {
        console.error('Error al obtener el perro', error);
    } finally {
        await sql.close();
    }
}
// Modificación de la función getDogNameRanking
async function getDogNameRanking(gender, breed) {
    try {
        await connectToDb();
        let query = 'SELECT name, COUNT(*) AS popularity FROM Dogs WHERE 1=1';

        // Agregar condiciones al filtro según los parámetros
        if (gender) {
            query += ` AND sex = @gender`;
        }
        if (breed) {
            query += ` AND breed = @breed`;
        }

        query += ' GROUP BY name ORDER BY popularity DESC OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY';

        const request = new sql.Request();
        if (gender) {
            request.input('gender', sql.VarChar, gender);
        }
        if (breed) {
            request.input('breed', sql.VarChar, breed);
        }

        const result = await request.query(query);
        return result.recordset; // Retorna el ranking de perros
    } catch (error) {
        console.error('Error al obtener el ranking de nombres de perros', error);
        throw error;
    } finally {
        await sql.close();
    }
}

// Obtener las razas disponibles de la base de datos
async function getBreeds() {
    try {
        await connectToDb();
        const query = 'SELECT DISTINCT breed FROM Dogs'; // Consulta para obtener razas únicas
        const request = new sql.Request();
        const result = await request.query(query);
        return result.recordset.map(row => row.breed); // Retornar solo las razas
    } catch (error) {
        console.error('Error al obtener las razas de perros', error);
        throw error;
    } finally {
        await sql.close();
    }
}
// Obtener el ranking de razas
async function getDogBreedRanking(gender) {
    try {
        await connectToDb();
        let query = 'SELECT breed, COUNT(*) AS popularity FROM Dogs WHERE 1=1';

        // Si hay un filtro de género, se agrega la condición
        if (gender) {
            query += ' AND sex = @gender';
        }

        query += ' GROUP BY breed ORDER BY popularity DESC OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY';

        const request = new sql.Request();

        // Si hay un género, lo pasamos como parámetro a la consulta
        if (gender) {
            request.input('gender', sql.VarChar, gender);
        }

        const result = await request.query(query);
        return result.recordset; // Retorna el ranking de razas
    } catch (error) {
        console.error('Error al obtener el ranking de razas', error);
        throw error;
    } finally {
        await sql.close();
    }
}


module.exports = {
    createDog,
    updateDog,
    deleteDog,
    getLostDogs,
    getDogsIdByUserId,
    getDogById,
    getDogNameRanking,
    getDogBreedRanking,
    getBreeds
};