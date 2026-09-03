import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import martRoutes from './routes/mart.routes';
import categoryRoutes from './routes/category.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import uploadRoutes from './routes/upload.routes';
import wishlistRoutes from './routes/wishlist.routes';
import { apiRateLimiter } from './middleware/rateLimiter';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', apiRateLimiter, productRoutes);
app.use('/api/marts', apiRateLimiter, martRoutes);
app.use('/api/categories', apiRateLimiter, categoryRoutes);
app.use('/api/cart', apiRateLimiter, cartRoutes);
app.use('/api/orders', apiRateLimiter, orderRoutes);
app.use('/api/upload', apiRateLimiter, uploadRoutes);
app.use('/api/wishlist', apiRateLimiter, wishlistRoutes);

export default app;