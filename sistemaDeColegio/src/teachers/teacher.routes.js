import {Router} from "express"
import {getOneById} from '../teachers/teacher.controller.js'
import { validatejwt } from '../../middlewares/validate.jwt.js'
const api =Router()

api.get( '/:id', [validatejwt],getOneById)

export default api