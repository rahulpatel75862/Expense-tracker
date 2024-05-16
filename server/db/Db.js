import mongoose, { mongo } from "mongoose";

export const connectDb = async () => {
    try{
        const connection = await mongoose.connect(process.env.MOGODB_URI)
        console.log('Mongo Db Connected Successfully!')
    } catch(error){
        console.error(error.message)
        process.exit(1)
    }
}