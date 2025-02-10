import {Schema, model} from 'mongoose'

const materiaSchema =Schema(
    {
        name:{
            type:String,
            required:[true,'name is required'],
            maxLength:[15,`can not be overcome 15 characters`]
        },

        description:{
            type:String,
            maxLength: 250
        },
        teacher:{
            type: Schema.Types.ObjectId,
            ref: 'teacher',
        },

        student: [{
            type:Schema.Types.ObjectId,
            ref:'student'
        }]


    }
)

materiaSchema.static.addStudentToCourse = async function(courseId,studentId){
    const studentCourse = await this.countDocuments({ students: studentId })
    if(studentCourse >=3){
        throw new Error("A student cannot be assigned to more than 3 courses.")
    }
    return this.findByIdAndUpdate(courseId, { $addToSet: { students: studentId } }, { new: true })

}

materiaSchema.statics.updateCourseByTeacher = async function(courseId, teacherId,updateData ){
    const course = await this.findOne({ _id: courseId, teacher: teacherId })
    if (!course) {
        throw new Error("Unauthorized: Only the assigned teacher can update this course.")
    }
    return this.findByIdAndUpdate(courseId, updateData, { new: true })
}

export default model('Materia',materiaSchema)