import "reflect-metadata";
import { DataSource } from "typeorm";
import Account from "../domain/Account";
import Task from "../domain/Task";
import WorkOrder from "../domain/WorkOrder";

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
