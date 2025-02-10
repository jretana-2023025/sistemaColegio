import Teacher from '../src/teachers/teacher.model.js'
import { isValidObjectId } from 'mongoose'

export const existUsername = async (username) => {
    const alreadyUsername = await Teacher.findOne({username})
    if(alreadyUsername){
        console.error(`Uername ${username} is already taken`)
        throw new Error(`Username ${username} is aready taken`)
    }
}


export const objectIdValid = async(objectId)=>{
    if(!isValidObjectId(objectId)){
        throw new Error(`Keeper is not objectId valid`)
    }
}