import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import { apiRateLimiter } from './middleware/rateLimiter';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', apiRateLimiter, productRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World! Server is running.");
});

export default app;