
import rateLimit from "express-rate-limit";

export const limiter= rateLimit(
    {
        windowMs: 15*60*1000,//rango de tiempo
        max:100,
        message:{
            message:'your blocked, wait 15 minutes'
        }//cantidad de peticiones permitidas en el rango de tiempo
    }
)