import mongoose from "mongoose";
import * as dotenv from 'dotenv';
export default async function connecttodb() {
    dotenv.config()
    console.log("Here is ",process.env.mongourl)
    try {
        const mongourl=process.env.mongourl
        const connect=await mongoose.connect(mongourl,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        console.log("Succesful")
        return connect
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
}