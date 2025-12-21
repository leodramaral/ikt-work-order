import WorkOrderRepository from "./WorkOrderRepository";

export default class GetWorkOrders {
    constructor(readonly workOrderRepository: WorkOrderRepository) { }

    async execute() {
        const workOrders = await this.workOrderRepository.findAll();
        return workOrders.map(wo => ({
            id: wo.id,
            title: wo.title,
            description: wo.description,
            tasks: wo.tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description
            })),
            createdAt: wo.createdAt,
        }));
    }
}
