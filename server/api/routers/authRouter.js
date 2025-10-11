import express from "express"
const router = express.Router()
import {register , login } from "../controllers/authControllers.js"
import { loginSchema, registerSchema , validate } from "../../utils/validators.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { getProfile } from "../controllers/userController.js"


//endpoint
router.post("/register" ,validate(registerSchema),register)
router.post("/login"    ,validate(loginSchema), login)
router.get("/profile"   ,verifyToken, getProfile)

export default router