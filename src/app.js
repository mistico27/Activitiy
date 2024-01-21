import express from 'express';
import morgan from 'morgan';
import routes from './routes/auth_routes.js'
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/tasks_routes.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin:'http://localhost:5173', 
   credentials:true,
   optionSuccessStatus:200,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api",routes);
app.use("/api",taskRoutes);



export default app;