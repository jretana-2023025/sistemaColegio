import Student from './student.model.js'
import { generateJwt } from '../../utils/jwt.js'  
import Course from "../cursos/cursos.model.js";

export const findAllStudends = async (req, res) => {
    try {
        const students = await Student.find()
        res.status(200).send(students)
    } catch (error) {
        res.status(400).send(error)
    }
}


export const findByIdStudent = async (req, res) => {
    try {
        const { id } = req.params
        const studentIdFromToken = req.user.id
        if (String(id) !== String(studentIdFromToken)) {
            return res.status(403).send({ success: false, message: "Unauthorized: You can only view your own profile." })
        }
        const student = await Student.findById(id).populate("courses", "name description")
        if (!student) {
            return res.status(404).send({ success: false, message: "Student not found" })
        }

        return res.send({
            success: true,
            student: {
                id: student._id,
                name: student.name,
                surname: student.surname,
                username: student.username,
                email: student.email,
                phone: student.phone,
                role: student.role,
                courses: student.courses 
            }
        })

    } catch (err) {
        console.error("Error fetching student profile:", err);
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, surname, username, email, phone } = req.body;
        const studentIdFromToken = req.user.id;

        
        if (id !== studentIdFromToken) {
            return res.status(403).send({ success: false, message: "Unauthorized: You can only update your own profile." });
        }

        
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, surname, username, email, phone },
            { new: true, runValidators: true }
        );

        return res.send({
            success: true,
            message: "Student updated successfully",
            updatedStudent
        });

    } catch (err) {
        console.error("Error updating student:", err);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}


export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id
        if (req.params.id !== userId) {
            return res.status(403).send({ message: 'No puedes eliminar otro perfil.' })
        }
        const student = await Student.findById(userId)
        if (!student) {
            return res.status(404).json({ message: 'Alumno no encontrado' })
        }
        await Student.findByIdAndDelete(userId);
        return res.status(200).json({ message: 'Perfil eliminado correctamente' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el perfil', error })
    }
}

export const addStudentCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const studentId = req.user.id; 
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send({ success: false, message: "Course not found" });
        }
        const isStudentInCourse = course.students.includes(studentId);
        if (isStudentInCourse) {
            return res.status(400).send({ success: false, message: "Student is already enrolled in this course." });
        }
        const studentCoursesCount = await Course.countDocuments({ students: studentId });
        if (studentCoursesCount >= 3) {
            return res.status(400).send({ success: false, message: "A student cannot be assigned to more than 3 courses." });
        }
        await Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { students: studentId } },
            { new: true }
        );
        await Student.findByIdAndUpdate(
            studentId,
            { $addToSet: { courses: courseId } }, 
            { new: true }
        )
        return res.send({
            success: true,
            message: "Student successfully added to the course",
        })

    } catch (err) {
        console.error("Error adding student to course:", err);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}