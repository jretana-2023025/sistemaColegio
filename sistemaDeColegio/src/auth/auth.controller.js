
import Teacher from '../teachers/teacher.model.js'
import Student from '../students/student.model.js'
import {checkPassword,encrypt} from '../../utils/encryp.js'
import {generateJwt} from '../../utils/jwt.js'

export const registerTeacher = async (req,res) => {
    try {
        let data = req.body
        let teacher = new Teacher(data)
        teacher.password = await encrypt(teacher.password)
        teacher.role="TEACHER"
        await teacher.save()
        return res.send({message: `Registered succesfully, can be llogede with username: ${teacher.username}`})
    } catch (error) {
        return res.status(500).send({message: 'general error with reistering user',error})
    }
}

export const registerStudent = async (req, res) => {
    try {
        let data = req.body
        let student = new Student(data)
        student.password = await encrypt(data.password)
        student.role = 'STUDENT'
        await student.save()
        return res.send({ message: `Student registered successfully, can be logged with username: ${student.username}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General Error during student registration' })
    }
}

export const login = async (req, res) => {
    try {
        let {userLogin,password} = req.body
        let user = await Teacher.findOne(
            {
                $or:[
                    {email: userLogin},
                    {username:userLogin}
                ]
            }
        ) || await Student.findOne(
            {
                $or:[
                    {email: userLogin},
                    {username:userLogin}
                ]
            }
        )
        if(user && await checkPassword(teacher.password,password)){

            let loggerUser={
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }

            let token = await generateJwt(loggerUser)
            return res.send({
                message:`welcome${user.name}`,
                loggerTeacher,
                token
            })
        }
        return res.status(400).send({message:`Invalid credentieals`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General errror with login',error})
    }
}