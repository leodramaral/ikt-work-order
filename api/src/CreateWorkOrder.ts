import WorkOrder from "./WorkOrder";
import TaskRepository from "./TaskRepository";
import WorkOrderRepository from "./WorkOrderRepository";

export default class CreateWorkOrder {
    constructor(
        readonly workOrderRepository: WorkOrderRepository, 
        readonly taskRepository: TaskRepository
    ) { }

    async execute(input: Input): Promise<string> {
        const tasks = await this.taskRepository.findByIds(input.taskIds);

        if (tasks.length !== input.taskIds.length) {
            const foundIds = tasks.map(t => t.id);
            const missingIds = input.taskIds.filter(id => !foundIds.includes(id));
            throw new Error(`Tasks não encontradas: ${missingIds.join(', ')}`);
        }

        const workOrder = WorkOrder.create(input.title, input.description);
        
        tasks.forEach(task => workOrder.addTask(task));

        const saved = await this.workOrderRepository.save(workOrder);
        return saved.id;
    }
}

type Input = {
    title: string;
    description?: string;
    taskIds: string[];
}
