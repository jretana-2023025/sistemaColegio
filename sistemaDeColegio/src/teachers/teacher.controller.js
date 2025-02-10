import Teacher from './teacher.model.js'

export const getOneById = async (req, res) => {
    try {
        const { id } = req.params; 
        const teacherIdFromToken = req.user?.id; 
        if (!teacherIdFromToken) {
            return res.status(401).send({ success: false, message: "Unauthorized" });
        }
        if (String(id) !== String(teacherIdFromToken)) {
            return res.status(403).send({ success: false, message: "You are not authorized. You can only view your own profile." });
        }
        const teacher = await Teacher.findById(id).populate("courses", "name description");
        if (!teacher) {
            return res.status(404).send({ success: false, message: "Teacher not found" });
        }
        return res.send({
            success: true,
            teacher: {
                id: teacher._id,
                name: teacher.name,
                surname: teacher.surname,
                username: teacher.username,
                email: teacher.email,
                phone: teacher.phone,
                role: teacher.role,
                courses: teacher.courses 
            }
        });

    } catch (err) {
        console.error("Error fetching teacher profile:", err);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
};

// UPDATE hacia el perfil del profesor 
export const updateCourseByTeacher = async (req, res) => {
    try {
        const { teacherId, id, name, description } = req.body;
        const course = await Course.findOne({ _id: id, teacher: teacherId });
        if (!course) {
            return res.status(403).send({ success: false, message: "Unauthorized: Only the assigned teacher can update this course." });
        }
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        )

        return res.send({
            success: true,
            message: "Course updated successfully",
            updatedCourse
        })
    } catch (err) {
        console.error("Error updating course:", err);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}



