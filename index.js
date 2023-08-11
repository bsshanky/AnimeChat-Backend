import mongodb from 'mongodb'; 
import dotenv from 'dotenv';
import app from './server.js';
import MessagesDAO from './dao/messagesDAO.js';

async function main() {

    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.ANIMECHAT_DB_URI
    );

    const port = process.env.PORT || 8000;

    try {
        // Connect to MongoDB server
        await client.connect();
        await MessagesDAO.injectDB(client);
        
        app.listen(port, () => {
            console.log (`Server is running on port ${port}`);
        });
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);

export default app;