import "reflect-metadata";
import { DataSource } from "typeorm";
import Account from "./Account";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "password",
    database: "ikt_work_order",
    synchronize: true,
    entities: [Account],
    migrations: ["src/migrations/**/*.ts"],
})