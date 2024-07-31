import { config } from 'dotenv';
config();

export const {
  PORT,
  HOST,
  SWAGGER_PREFIX,
  SECRET_JWT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  SALT_ROUNDS,
  JWT_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
} = process.env;
