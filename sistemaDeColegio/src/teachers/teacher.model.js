
import { Schema,model } from "mongoose";

const teacherSchema =Schema(
    {
        name:{
            type: String,
            required:[true,'name is required'],
            maxLength:[25,`can not be overcome 25 characters`]
        },
        surname:{
            type:String,
            required:[true,'surname is required'],
            maxLength:[25,`can not be overcome 25 characters`]
        },
        username:{
            type:String,
            required:[true,'username is required'],
           unique:[true,'this username is already exist'],
           lowercase:true,
           maxLength:[15,`can not be overcome 15 characters`]
            
        },
        email:{
            type:String,
            required:[true,'Email is required'],
            unique:true
        },
        password:{
            type:String,
            required:[true,'password is required'],
            minLength:[8,'Password must be 8 characters'],
            maxlength:[100,'can not be overcome 16 characters'],
        },
        phone:{
            type:String,
            required:[true,'Phone is required'],
            minLength:[8,`can not be overcome 8 characters`],
            maxlength:[15,'Phone must be 13 numbers'],
           
        },

        role:{
            type:String,
            required:[true,'Role is required'],
            uppercase:true,
            enum:['TEACHER']
        },

        courses:{
            type: Schema.Types.ObjectId,
            ref:'course'
            
        },
       


    }
)

export default model('Teacher',teacherSchema)