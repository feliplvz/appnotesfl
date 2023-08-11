import dotenv from "dotenv";

dotenv.config()

export const mongoURL: string = process.env.MONGO_URL ?? 'default-value';
export const secretMongo: string = process.env.SECRET_MONGO ?? 'default-value';
export const originURL: string = process.env.ORIGIN_URL ?? 'default-value';
export const mailAdmin: string = process.env.MAIL_ADMIN ?? 'default-value';
export const apiPassword: string = process.env.API_PASSWORD ?? 'default-value';

export const port = process.env.PORT || 3000;