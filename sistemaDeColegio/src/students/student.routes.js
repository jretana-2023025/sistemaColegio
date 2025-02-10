import { Router } from "express"
import {  findAllStudends, findByIdStudent, updateStudent,  deleteUser, addStudentCourse 
} from "./student.controller.js"
import { validatejwt } from '../../middlewares/validate.jwt.js'
import { validateStudentJwt } from '../../middlewares/validate.jwt.js'
import { updateStudentValidator } from '../../middlewares/validators.js'


const api = Router()

api.get('/', findAllStudends)
api.get('/:id', [validatejwt], findByIdStudent)
api.put('/:id',[validatejwt],
                 [updateStudentValidator],
                [validateStudentJwt],
                updateStudent
)
api.delete('/:id', [validatejwt], [validateStudentJwt],deleteUser)
api.post('/asignarCurso',[validatejwt], addStudentCourse)

export default api