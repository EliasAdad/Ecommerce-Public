import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from 'dotenv'
import { registerAs } from "@nestjs/config";

dotenvConfig({ path: '.env' })


const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts, .js}'],
    migrations: ['dist/migrations/*{.ts, .js}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    dropSchema: false

}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)