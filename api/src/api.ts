import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import Signup from './Signup';
import { AppDataSource } from './data-source';
import { AccountRepositoryDataBase } from './AccountRepository';

export async function api() {
    await AppDataSource.initialize();
    const app = express();
    app.use(express.json());
    app.use(cors());

    const accountRepository = new AccountRepositoryDataBase();
    const signup = new Signup(accountRepository);

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

    app.listen(3000, () => {
        console.log('API is running on http://localhost:3000');
    });
}

api().catch((error) => {
    console.error("❌ Error starting server:", error);
    process.exit(1);
});
