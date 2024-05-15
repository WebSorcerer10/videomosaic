import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB()

/*import express from "express";
const app=express()
//we always use async and await and
//always wrap that code in try catch
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => { 
            console.log("application not able to talk to database");
            throw error
         })

         app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
         })
    } catch (error) {
        console.error("ERROR: " , error)
        throw err
    }
} )()
*/