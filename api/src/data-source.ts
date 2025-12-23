import "reflect-metadata";
import { DataSource } from "typeorm";
import Account from "./domain/Account";
import Task from "./domain/Task";
import WorkOrder from "./domain/WorkOrder";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "ikt_work_order",
    synchronize: true,
    entities: [Account, Task, WorkOrder],
    migrations: ["src/database/migrations/**/*.ts"],
})
