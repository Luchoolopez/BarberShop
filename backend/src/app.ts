import express from 'express';
import cors from 'cors';
import { router } from './routes';

export function makeApp() {
    const app = express();

    app.use(express.json());

    const allowedOrigins = ['http://localhost:5173'];
    if (process.env.FRONTEND_URL) {
        allowedOrigins.push(process.env.FRONTEND_URL);
    }

    const corsOptions = {
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-type, Authorization',
        optionSuccessStatus: 204,
    };

    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', router);

    app.use((req, res) => { res.status(404).json({ message: 'Not Found' }) });

    return app;
}