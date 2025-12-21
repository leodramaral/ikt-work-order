import { Repository } from "typeorm";
import Task from "./Task";
import { AppDataSource } from "./data-source";

export default interface TaskRepository {
    findAll(): Promise<Task[]>;
}

export class TaskRepositoryTypeORM implements TaskRepository {
    private repository: Repository<Task>;

    constructor() {
        this.repository = AppDataSource.getRepository(Task);
    }

    async findAll(): Promise<Task[]> {
        return await this.repository.find({
            order: { createdAt: "DESC" }
        });
    }

}
