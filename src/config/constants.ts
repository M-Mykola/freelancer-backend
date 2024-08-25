import { config } from 'dotenv';
config();

export const {
  PORT,
  HOST,
  SWAGGER_PREFIX,
  SECRET_JWT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
  MAILER_PORT,
  MAILER_HOST,
  MAILER_USER,
  MAILER_PASSWORD

} = process.env;

export const DATABASE_PORT_NUMBER = parseInt(DATABASE_PORT as string, 10);