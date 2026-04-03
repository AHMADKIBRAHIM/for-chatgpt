import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import categoriesRoutes from './modules/categories/categories.routes.js';
import productsRoutes from './modules/products/products.routes.js';
import tablesRoutes from './modules/tables/tables.routes.js';
import ordersRoutes from './modules/orders/orders.routes.js';
import paymentsRoutes from './modules/payments/payments.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';
import settingsRoutes from './modules/settings/settings.routes.js';
import uploadRoutes from './modules/uploads/upload.routes.js';
import notFound from './middleware/notFound.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';
import { env } from './config/env.js';

const app=express();
app.use(cors({origin:env.clientUrl,credentials:true}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health',(req,res)=>res.json({success:true,message:'OK'}));
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/users',usersRoutes);
app.use('/api/v1/categories',categoriesRoutes);
app.use('/api/v1/products',productsRoutes);
app.use('/api/v1/tables',tablesRoutes);
app.use('/api/v1/orders',ordersRoutes);
app.use('/api/v1/payments',paymentsRoutes);
app.use('/api/v1/reports',reportsRoutes);
app.use('/api/v1/settings',settingsRoutes);
app.use('/api/v1/uploads',uploadRoutes);

app.use(notFound);
app.use(errorMiddleware);
export default app;
