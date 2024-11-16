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

const dbConnect = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Conexión a SQL Server exitosa');
        // haz un log que muestre las tablas de la base de datos
        const result = await sql.query`SELECT * FROM information_schema.tables`;
        console.log(result.recordset);
        
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
    }
};

module.exports = dbConnect;
//export default dbConnect;