import { Router} from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getTask,getTasks,createTasks,updateTask,deleteTask} from "../controllers/task_controller.js";

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.post('/tasks', authRequired,createTasks);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', updateTask);



export default router;
