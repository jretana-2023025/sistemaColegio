import {Router} from "express"
import {addCurso,listCurso,getCourseById,updateCurso,deleteCurso} from './cursos.controller.js'
import {validateCreateCourse,validateUpdateCourse} from '../../middlewares/validators.js'
import { validatejwt,validateTeacher} from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/addCurso', [validatejwt],
                     [validateTeacher],
                     [validateCreateCourse],addCurso)
api.get('/listarCurso',[validatejwt],
                       [validateTeacher],listCurso)
api.get('/getCourseById/:Id',[validatejwt],
                        [validateTeacher],getCourseById)
api.put('/updateCurso/:id',[validatejwt],
                           [validateTeacher],[validateUpdateCourse],updateCurso)
api.delete('/deleteCurso/:id',[validatejwt],
                              [validateTeacher],deleteCurso)

export default api;