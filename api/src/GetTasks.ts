import TaskRepository from "./TaskRepository";

export default class GetTasks {
    constructor(readonly taskRepository: TaskRepository) { }

    async execute(): Promise<Output[]> {
        const tasks = await this.taskRepository.findAll();
        return tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,  
        }));
    }
}

type Output = {
    id: string;
    title: string;
    description?: string;
}
