import WorkOrderRepository from "../repository/WorkOrderRepository";
import Task from "../domain/Task";

export default class GetWorkOrders {
    constructor(readonly workOrderRepository: WorkOrderRepository) { }

    async execute() {
        const workOrders = await this.workOrderRepository.findAll();
        return workOrders.map(wo => ({
            id: wo.id,
            title: wo.title,
            description: wo.description,
            tasks: wo.tasks.map((task: Task) => ({
                id: task.id,
                title: task.title,
                description: task.description
            })),
            createdAt: wo.createdAt,
        }));
    }
}
