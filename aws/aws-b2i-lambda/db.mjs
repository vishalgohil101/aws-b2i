import pg from 'pg';

const { Client } = pg;

export const getClient = async () => {
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    });

    await client.connect();
    return client;
};
