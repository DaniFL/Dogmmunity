const {MongoClient} = require('mongodb');

async function main() {
    const uri = "mongodb+srv://root:root@dogmunity.buz48.mongodb.net/?retryWrites=true&w=majority&appName=Dogmunity";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

//Listar bases de datos del cluster de mongo
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

//