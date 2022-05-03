import { DataSourceOptions } from 'typeorm';


const config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.port),
    username: process.env.username,
    password: process.env.password,
    database: 'mediumclone',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,

};

export default config;

