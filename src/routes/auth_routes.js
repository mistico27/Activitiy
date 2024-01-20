import {Router} from 'express'
import {login,register} from "../controllers/auth_controller.js";

const router = Router();
//routes
router.post('/register',register);
router.post('/login',login);


export default router;