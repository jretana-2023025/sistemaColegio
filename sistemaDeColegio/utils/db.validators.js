import Student from '../src/student/student.model.js';
import Teacher from '../src/teacher/teacher.model.js';
import { isValidObjectId } from 'mongoose';

export const existUsername = async (username) => {
    username = username.trim(); 

    const student = await Student.findOne({ username });
    const teacher = await Teacher.findOne({ username });

    if (student || teacher) {
        console.error(`Username "${username}" is already taken`);
        throw new Error(`Username "${username}" is already taken`);
    }
};

export const objectIdValid = async (objectId) => {
    if (!isValidObjectId(objectId)) {
        throw new Error(`The provided ID "${objectId}" is not a valid ObjectId`);
    }
};