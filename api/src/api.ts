import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { AppDataSource } from './database/data-source';
import { AccountRepositoryTypeORM } from './repository/AccountRepository';
import { TaskRepositoryTypeORM } from './repository/TaskRepository';
import { WorkOrderRepositoryTypeORM } from './repository/WorkOrderRepository';
import Login from './usecase/Login';
import GetTasks from './usecase/GetTasks';
import GetWorkOrders from './usecase/GetWorkOrders';
import Signup from './usecase/Signup';
import CreateWorkOrder from './usecase/CreateWorkOrder';

export async function api() {
    await AppDataSource.initialize();
    const app = express();
    app.use(express.json());
    app.use(cors());

    const accountRepository = new AccountRepositoryTypeORM();
    const taskRepository = new TaskRepositoryTypeORM();
    const workOrderRepository = new WorkOrderRepositoryTypeORM();
    const signup = new Signup(accountRepository);
    const login = new Login(accountRepository);
    const task = new GetTasks(taskRepository);
    const createWorkOrder = new CreateWorkOrder(workOrderRepository, taskRepository);
    const getWorkOrders = new GetWorkOrders(workOrderRepository);

    app.post('/signup', async (req: Request, res: Response) => {
        try {
            const input = req.body;
            const output = await signup.execute(input);
            res.json(output);
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            });
        }
    });

    app.post('/login', async (req: Request, res: Response) => {
        try {
            const input = req.body;
            const success = await login.execute(input);
            res.json({ success });
        }
        catch (e: any) {
            res.status(500).json({
                message: e.message
            });
        }
    });

    app.get('/tasks', async (req: Request, res: Response) => {
        try {
            const response = await task.execute();
            res.json(response);
        }
        catch (e: any) {
            res.status(500).json({
                message: e.message
            });
        };
    });

    app.get('/work-orders', async (req: Request, res: Response) => {
        try {
            const workOrders = await getWorkOrders.execute();
            res.json(workOrders);
        }
        catch (e: any) {
            res.status(500).json({
                message: e.message
            });
        }
    });

    app.post('/work-orders', async (req: Request, res: Response) => {
        try {
            const input = req.body;
            const workOrderId = await createWorkOrder.execute(input);
            res.status(201).json({ id: workOrderId });
        }
        catch (e: any) {
            res.status(500).json({
                message: e.message
            });
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`API is running on http://localhost:${PORT}`);
    });
}

api().catch((error) => {
    console.error("❌ Error starting server:", error);
    process.exit(1);
});
