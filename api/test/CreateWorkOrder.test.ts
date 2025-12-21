import CreateWorkOrder from "../src/CreateWorkOrder";
import Task from "../src/Task";
import WorkOrder from "../src/WorkOrder";
import TaskRepository from "../src/TaskRepository";
import WorkOrderRepository from "../src/WorkOrderRepository";

class FakeTaskRepository implements TaskRepository {
    private tasks: Task[];

    constructor() {
        const task1 = Task.create("Implementar login", "Adicionar autenticação");
        task1.id = "task-1";
        task1.createdAt = new Date("2025-01-01");
        task1.updatedAt = new Date("2025-01-01");

        const task2 = Task.create("Criar testes", "Adicionar testes unitários");
        task2.id = "task-2";
        task2.createdAt = new Date("2025-01-02");
        task2.updatedAt = new Date("2025-01-02");

        const task3 = Task.create("Revisar código", "Code review do PR");
        task3.id = "task-3";
        task3.createdAt = new Date("2025-01-03");
        task3.updatedAt = new Date("2025-01-03");

        this.tasks = [task1, task2, task3];
    }

    async findAll(): Promise<Task[]> {
        return this.tasks;
    }

    async findByIds(ids: string[]): Promise<Task[]> {
        return this.tasks.filter(task => ids.includes(task.id));
    }
}

class FakeWorkOrderRepository implements WorkOrderRepository {
    private workOrders: WorkOrder[] = [];
    private idCounter = 1;

    async save(workOrder: WorkOrder): Promise<WorkOrder> {
        if (!workOrder.id) {
            workOrder.id = `wo-${this.idCounter++}`;
            workOrder.createdAt = new Date();
            workOrder.updatedAt = new Date();
        }
        this.workOrders.push(workOrder);
        return workOrder;
    }

    async findAll(): Promise<WorkOrder[]> {
        return this.workOrders;
    }
}

describe("CreateWorkOrder", () => {
    let createWorkOrder: CreateWorkOrder;
    let taskRepository: FakeTaskRepository;
    let workOrderRepository: FakeWorkOrderRepository;

    beforeEach(() => {
        taskRepository = new FakeTaskRepository();
        workOrderRepository = new FakeWorkOrderRepository();
        createWorkOrder = new CreateWorkOrder(workOrderRepository, taskRepository);
    });

    test("deve criar uma work order com tasks válidas", async () => {
        const workdOrderInput = {
            title: "Sprint 1",
            description: "Primeira sprint do projeto",
            taskIds: ["task-1", "task-2"]
        };

        const workOrderId = await createWorkOrder.execute(workdOrderInput);

        expect(workOrderId).toBeDefined();
        expect(workOrderId).toBe("wo-1");
        
        const savedWorkOrders = await workOrderRepository.findAll();
        expect(savedWorkOrders).toHaveLength(1);
        expect(savedWorkOrders[0].title).toBe("Sprint 1");
        expect(savedWorkOrders[0].description).toBe("Primeira sprint do projeto");
        expect(savedWorkOrders[0].tasks).toHaveLength(2);
        expect(savedWorkOrders[0].tasks[0].id).toBe("task-1");
        expect(savedWorkOrders[0].tasks[0].title).toBe("Implementar login");
        expect(savedWorkOrders[0].tasks[1].id).toBe("task-2");
        expect(savedWorkOrders[0].tasks[1].title).toBe("Criar testes");
    });

    test("deve lançar exceção ao tentar criar work order com task id inválido", async () => {
        const workdOrderInput = {
            title: "Sprint 1",
            description: "Primeira sprint do projeto",
            taskIds: ["task-1", "task-invalido"]
        };

        await expect(createWorkOrder.execute(workdOrderInput)).rejects.toThrow(
            "Tasks não encontradas: task-invalido"
        );
        
        const savedWorkOrders = await workOrderRepository.findAll();
        expect(savedWorkOrders).toHaveLength(0);
    });
});