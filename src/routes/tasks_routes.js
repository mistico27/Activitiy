import { Router} from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getTask,getTasks,createTasks,updateTask,deleteTask} from "../controllers/task_controller.js";

import {createTaskSchema} from "../schemas/task_schema.js";
import {validateSchema} from "../middlewares/validatorMiddleware.js";

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.post('/tasks', authRequired,validateSchema(createTaskSchema),createTasks);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', updateTask);



export default router;
