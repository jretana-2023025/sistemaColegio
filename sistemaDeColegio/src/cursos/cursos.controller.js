import Course from './cursos.model.js';
import Student from '../students/student.model.js';
import Teacher from "../teachers/teacher.model.js";



export const addCurso = async (req, res) => {
    try {
        const { teacherId, name, description } = req.body
        const teacher = await Teacher.findById(teacherId)
        if (!teacher) {
            return res.status(404).send({ success: false, message: "Teacher not found" })
        }
        const course = new Course({ name, description, teacher: teacherId });
        await course.save();
        await Teacher.findByIdAndUpdate(teacherId, { $push: { courses: course._id } })
        return res.send({ success: true, message: "Course created successfully", course })
    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).send({ success: false, message: "General error", error })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params; 
        const course = await Course.findById(id).populate('teacher').populate('students')
        
        if (!course) {
            return res.status(404).send({ message: 'Course not found' })
        }
        
        return res.send({ course })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'General error',
            error
        })
    }
}


export const listCurso = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher').populate('students')
        return res.send({ courses })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'General error',
            error
        })
    }
}


export const updateCurso = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, description } = req.body
        const teacherId = req.user.id; 
        const course = await Course.findById(id)
        if (!course) {
            return res.status(404).send({ success: false, message: "Course not found" })
        }
        if (course.teacher.toString() !== teacherId) {
            return res.status(403).send({ success: false, message: "Unauthorized: Only the assigned teacher can update this course." })
        }
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        )
        return res.send({
            success: true,
            message: "Course updated successfully",
            updatedCourse
        })
    } catch (err) {
        console.error("Error updating course:", err);
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}


export const deleteCurso = async (req, res) => {
    try {
        const { id } = req.params; 
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).send({ message: "Course not found" })
        }
        await Student.updateMany(
            { courses: id },
            { $pull: { courses: id } }
        );
        await Course.findByIdAndDelete(id)

        return res.send({ success: true, message: "Course deleted successfully, students updated" })

    } catch (error) {
        console.error("Error deleting course:", error)
        return res.status(500).send({
            success: false,
            message: "General error",
            error
        })
    }
}