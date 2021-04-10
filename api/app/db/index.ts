import { Client } from 'pg'

export const client = new Client({
    host: 'localhost',
    port: 5436,
    user: 'chicago',
    password: 'password',
    database: 'sokobandb',
});

client.connect()