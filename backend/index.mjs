import { getClient } from './db.mjs';

export const handler = async (event) => {
    let client;

    try {
        client = await getClient();

        //Ensure table exists
        await client.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) UNIQUE
            );
        `);

        const method = event.httpMethod || event.requestContext?.http?.method;

        if (method === "OPTIONS") {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS"
                },
                body: ""
            };
        }

        if (method === 'GET') {
            const res = await client.query('SELECT * FROM categories ORDER BY id');

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS"
                },
                body: JSON.stringify(res.rows),
            };
        }


        if (method === 'POST') {
            const body = JSON.parse(event.body || '{}');

            if (!body.name) {
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS"
                    },
                    body: JSON.stringify({ error: 'Category name required' }),
                };
            }

            await client.query(
                'INSERT INTO categories(name) VALUES($1) ON CONFLICT (name) DO NOTHING',
                [body.name]
            );

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS"
                },
                body: JSON.stringify({ message: "Success" }),
            };
        }


        if (method === 'DELETE') {
            const body = JSON.parse(event.body || '{}');

            if (!body.id) {
                return {
                    statusCode: 400,
                    headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS"
                    },
                    body: JSON.stringify({ error: 'Category id required' }),
                };
            }

            await client.query(
                'DELETE FROM categories WHERE id = $1',
                [body.id]
            );

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS"
                },
                body: JSON.stringify({ message: "Success" }),
            };
        }

        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS"
            },
            body: JSON.stringify({ message: 'Unsupported method' }),
        };

    } catch (err) {
        console.error(err);

        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error: err.message }),
        };

    } finally {
        if (client) {
            await client.end();
        }
    }
};
