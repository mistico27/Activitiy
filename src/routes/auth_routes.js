import {Router} from 'express'
import {login,register,logout,profile} from "../controllers/auth_controller.js";
import {authRequired} from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validatorMiddleware.js";
import {registerSchema,loginSchema}from "../schemas/auth_schema.js";

const router = Router();
//routes
router.post('/register',validateSchema(registerSchema),register);
router.post('/login',validateSchema(loginSchema),login);
router.post('/logout',logout);
//routes for authentication
router.get('/profile',authRequired,profile);


export default router;