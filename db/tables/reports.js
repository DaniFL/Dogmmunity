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

// Crear un nuevo reporte
async function createReport(report) {
    try {
        await connectToDb();
        const query = `
            INSERT INTO Reports (id, dog_id, message, contact_info, reporter_id, photo_dog_encontrado, created_at)
            VALUES (NEWID(), @dog_id, @message, @contact_info, @reporter_id, @photo_dog_encontrado, GETDATE())
        `;
        const request = new sql.Request();
        request.input('dog_id', sql.UniqueIdentifier, report.dog_id);
        request.input('message', sql.Text, report.message);
        request.input('contact_info', sql.VarChar, report.contact_info);
        request.input('reporter_id', sql.UniqueIdentifier, report.reporter_id);
        request.input('photo_dog_encontrado', sql.VarChar, report.photo_dog_encontrado); // OJO: obligatorio añadir foto del perro encontrado
        await request.query(query);
        console.log('Reporte creado exitosamente en la base de datos');
    } catch (error) {
        console.error('Error al crear el reporte en la base de datos:', error);
        throw error;
    } finally {
        await sql.close();
    }
}


// Obtener un reporte por su ID
async function getReportById(reportId) {
    try {
        await connectToDb();
        const query = 'SELECT * FROM Reports WHERE id = @id';
        const request = new sql.Request();
        request.input('id', sql.UniqueIdentifier, reportId);
        const result = await request.query(query);
        return result.recordset[0];
    } catch (error) {
        console.error('Error al obtener el reporte', error);
        throw error;
    } finally {
        await sql.close();
    }
}

// Obtener todos los reportes de un perro específico
async function getReportsByDogId(dogId) {
    try {
        await connectToDb();
        const query = 'SELECT * FROM Reports WHERE dog_id = @dogId';
        const request = new sql.Request();
        request.input('dogId', sql.UniqueIdentifier, dogId);
        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener los reportes del perro', error);
        throw error;
    } finally {
        await sql.close();
    }
}

// Obtener todos los reportes realizados por un usuario
async function getReportsByUserId(userId) {
    try {
        await connectToDb();
        const query = 'SELECT * FROM Reports WHERE reporter_id = @userId';
        const request = new sql.Request();
        request.input('userId', sql.UniqueIdentifier, userId);
        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener los reportes del usuario', error);
        throw error;
    } finally {
        await sql.close();
    }
}

// Actualizar un reporte
async function updateReport(reportId, updates) {
    try {
        await connectToDb();
        const fields = Object.keys(updates).map(key => `${key} = @${key}`).join(', ');
        const query = `UPDATE Reports SET ${fields} WHERE id = @id`;
        const request = new sql.Request();
        request.input('id', sql.UniqueIdentifier, reportId);
        Object.keys(updates).forEach(key => {
            request.input(key, sql.VarChar, updates[key]);
        });
        await request.query(query);
        console.log('Reporte actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el reporte', error);
        throw error;
    } finally {
        await sql.close();
    }
}

// Eliminar un reporte por su ID
async function deleteReport(reportId) {
    try {
        await connectToDb();
        const query = 'DELETE FROM Reports WHERE id = @id';
        const request = new sql.Request();
        request.input('id', sql.UniqueIdentifier, reportId);
        await request.query(query);
        console.log('Reporte eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar el reporte', error);
        throw error;
    } finally {
        await sql.close();
    }
}

// Eliminar todos los reportes asociados a un perro específico
async function deleteReportsByDogId(dogId) {
    try {
        await connectToDb();
        const query = 'DELETE FROM Reports WHERE dog_id = @dogId';
        const request = new sql.Request();
        request.input('dogId', sql.UniqueIdentifier, dogId);
        await request.query(query);
        console.log('Reportes del perro eliminados exitosamente');
    } catch (error) {
        console.error('Error al eliminar los reportes del perro', error);
        throw error;
    } finally {
        await sql.close();
    }
}

// Eliminar todos los reportes realizados por un usuario específico
async function deleteReportsByUserId(userId) {
    try {
        await connectToDb();
        const query = 'DELETE FROM Reports WHERE reporter_id = @userId';
        const request = new sql.Request();
        request.input('userId', sql.UniqueIdentifier, userId);
        await request.query(query);
        console.log('Reportes del usuario eliminados exitosamente');
    } catch (error) {
        console.error('Error al eliminar los reportes del usuario', error);
        throw error;
    } finally {
        await sql.close();
    }
}

// Obtener todos los reportes para los perros de un usuario
async function getReportsForUserDogs(userId) {
    try {
        await connectToDb();
        const query = `
            SELECT 
                Reports.id AS report_id,
                Reports.message,
                Reports.contact_info,
                Reports.created_at,
                Reports.photo_dog_encontrado,
                Dogs.name AS dog_name
            FROM Reports
            INNER JOIN Dogs ON Reports.dog_id = Dogs.id
            WHERE Dogs.owner_id = @user_id
            ORDER BY Reports.created_at DESC
        `;
        const request = new sql.Request();
        request.input('user_id', sql.UniqueIdentifier, userId);
        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener los reportes para los perros del usuario:', error);
        throw error;
    } finally {
        await sql.close();
    }
}


module.exports = {
    createReport,
    getReportById,
    getReportsByDogId,
    getReportsByUserId,
    updateReport,
    deleteReport,
    deleteReportsByDogId,
    deleteReportsByUserId,
    getReportsForUserDogs
};
