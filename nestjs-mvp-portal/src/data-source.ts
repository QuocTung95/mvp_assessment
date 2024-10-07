import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './auth/user.entity';
import { Declaration } from './declarations/declarations.entity';
import { join } from 'path';

const STAGE = process.env.STAGE || 'dev';

dotenv.config({
  path: `.env.stage.${STAGE}`,
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Declaration],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  synchronize: false,
  logging: true,
});
