'use strict';

import jwt from 'jsonwebtoken'
import Student from '../src/students/student.model.js'

export const validatejwt = async (req,res,next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let {authorization} = req.headers

        if(!authorization) return res.status(401).send({message:'unauthorized'})
        let user=jwt.verify(authorization,secretKey)
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message:'Invalid credentials'})
    }
}

export const validateTeacher = async (req, res, next) => {
    try {
        
        if (req.user.role !== "TEACHER") {
            return res.status(403).send({ success: false, message: "Only teachers can access this resource." })
        }
        next(); 
    } catch (err) {
        console.error("Error validating teacher role:", err)
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

export const validateStudentJwt = async (req, res, next) => {
    try {
        
        let { authorization } = req.headers;
        if (!authorization) return res.status(401).send({ message: "Unauthorized" });

        let secretKey = process.env.SECRET_KEY;
        let user = jwt.verify(authorization, secretKey);
        const student = await Student.findById(user.id);
        if (!student) {
            return res.status(403).send({ success: false, message: "Forbidden: Only students can access this resource." });
        }

        req.user = user; 
        next(); 

    } catch (err) {
        console.error("JWT validation error:", err);
        return res.status(401).send({ message: "Invalid token" });
    }
}