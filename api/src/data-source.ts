import "reflect-metadata";
import { DataSource } from "typeorm";
import Account from "./Account";
import Task from "./Task";
import WorkOrder from "./WorkOrder";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "password",
    database: "ikt_work_order",
    synchronize: true,
    entities: [Account, Task, WorkOrder],
    migrations: ["src/migrations/**/*.ts"],
})
