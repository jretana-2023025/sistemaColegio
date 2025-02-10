import { Router } from "express"
import { registerTeacher,registerStudent, login} from "./auth.controller.js"

import{loginValidator, registerValidator}from '../../middlewares/validators.js'

const api = Router()

api.post('/registerStudent',[registerValidator],registerStudent)
api.post('/registerTeacher',[registerValidator],registerTeacher)
api.post('/login',[loginValidator],login)

export default api  