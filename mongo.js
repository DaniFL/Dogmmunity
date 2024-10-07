const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://root:root@dogmunity.buz48.mongodb.net/?retryWrites=true&w=majority&appName=Dogmunity";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('MongoDB Atlas conectado correctamente');
        return client;
    } catch (e) {
        console.error('Error al conectar con MongoDB Atlas:', e);
    } finally {
        await client.close();
    }
}

module.exports = { connectDB, client};