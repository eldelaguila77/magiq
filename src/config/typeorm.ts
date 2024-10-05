import { DataSource } from 'typeorm';
import path from 'path';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'magiq',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'magiq',
    entities: [
        path.join(__dirname, '../entity/**/**.ts')
    ],
    //synchronize: false,
    migrationsRun: true,
    logging: true, 
    migrations: [
        path.join(__dirname, '../migration/**/**.ts')
    ],
});

AppDataSource.initialize()
    .then(() => {
        console.log('TypeORM connection to MySQL has been established successfully.');
    })
    .catch((error) => {
        console.log('Unable to connect to the database:', error);
    });

export { AppDataSource };