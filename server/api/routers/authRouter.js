import express from "express"
const router = express.Router()
import {register , login } from "../controllers/authControllers.js"
import { loginSchema, registerSchema , validate } from "../../utils/validators.js"


//endpoint
router.post("/register" ,validate(registerSchema),register)
router.post("/login" , validate(loginSchema), login)

export default router