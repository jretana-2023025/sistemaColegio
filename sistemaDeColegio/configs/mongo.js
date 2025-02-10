import mongoose from "mongoose";


export const connect = async () => {
    try{
        mongoose.connection.on('e', ()=>{
            console.log('MongoDB | Could not be connect to mongodb')
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB | try connecting')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | connected to mongodb')
        })
        mongoose.connection.on('open', ()=>{
            console.log('MongoDB | connected to mongodb')
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('MongoDB | disconnect')
        })
 
        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50,//maximo de de conexiones 
                serverSelectionTimeoutMS: 5000//timpo maximo de espera la conexion
            }
        )
    }catch(e){
        console.error('Database connection failed', e)
    }
}