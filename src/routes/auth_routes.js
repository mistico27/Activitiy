import {Router} from 'express'
import {login,register,logout,profile} from "../controllers/auth_controller.js";
import {authRequired} from "../middlewares/validateToken.js";

const router = Router();
//routes
router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
//routes for authentication
router.get('/profile',authRequired,profile);


export default router;