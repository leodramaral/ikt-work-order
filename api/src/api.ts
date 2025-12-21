import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import Signup from './Signup';
import { AppDataSource } from './data-source';
import { AccountRepositoryTypeORM } from './AccountRepository';
import Login from './Login';
import { TaskRepositoryTypeORM } from './TaskRepository';
import GetTasks from './GetTasks';

export async function api() {
    await AppDataSource.initialize();
    const app = express();
    app.use(express.json());
    app.use(cors());

    const accountRepository = new AccountRepositoryTypeORM();
    const taskRepository = new TaskRepositoryTypeORM();
    const signup = new Signup(accountRepository);
    const login = new Login(accountRepository);
    const task = new GetTasks(taskRepository);

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

    app.listen(3000, () => {
        console.log('API is running on http://localhost:3000');
    });
}

api().catch((error) => {
    console.error("❌ Error starting server:", error);
    process.exit(1);
});
