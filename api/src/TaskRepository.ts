import { In, Repository } from "typeorm";
import Task from "./Task";
import { AppDataSource } from "./data-source";

export default interface TaskRepository {
    findAll(): Promise<Task[]>;
    findByIds(ids: string[]): Promise<Task[]>;
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

    async findByIds(ids: string[]): Promise<Task[]> {
        if (ids.length === 0) return [];
        return await this.repository.findBy({
            id: In(ids)
        });
    }

}
