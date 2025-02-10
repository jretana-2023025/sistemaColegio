'use strict';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet'
import { limiter } from '../middlewares/rate.limit.js'
import authRoutes from '../src/auth/auth.routes.js'
import studentRoutes from '../src/students/student.routes.js'
import courseRoutes from '../src/cursos/cursos.routes.js'
import teacherRoutes from '../src/teachers/teacher.routes.js'

const configs = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({extended:false}))
    app.use(cors());
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use('/v1/auth',authRoutes)
    app.use('/v1/students', studentRoutes)
    app.use('/v1/course', courseRoutes)
    app.use('/v1/teacher', teacherRoutes)
}

export const initServer =()=>{
    const app = express();
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`server running on port ${process.env.PORT}`)
    } catch (error) {
        console.log('server init failed', error);
    }
}
