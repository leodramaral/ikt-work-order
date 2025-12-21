import { Repository } from "typeorm";
import WorkOrder from "./WorkOrder";
import { AppDataSource } from "./data-source";

export default interface WorkOrderRepository {
    save(workOrder: WorkOrder): Promise<WorkOrder>;
    findAll(): Promise<WorkOrder[]>;
}

export class WorkOrderRepositoryTypeORM implements WorkOrderRepository {
    private repository: Repository<WorkOrder>;

    constructor() {
        this.repository = AppDataSource.getRepository(WorkOrder);
    }

    async save(workOrder: WorkOrder): Promise<WorkOrder> {
        return await this.repository.save(workOrder);
    }
    async findAll(): Promise<WorkOrder[]> {
        return await this.repository.find({
            relations: ["tasks", "assignedTo"],
            order: { createdAt: "DESC" }
        });
    }
}
