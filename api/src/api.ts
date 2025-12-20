import express from 'express';
import cors from 'cors';
import Signup from './Signup';

export function api() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    const signup = new Signup();

    app.post('/signup', (req, res) => {
        const input = req.body;
        const output = signup.execute();
        return res.status(201).json(output); 
    });
}