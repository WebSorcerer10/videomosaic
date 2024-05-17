import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app=express()

//configure theabove cors and cookieparser

//this use method is used for all middlewares
//cors usage- to mitiagte the risks of cross origin HTTP requests
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//now we are handling the data
//data can come in many form like json format
//this con
app.use(express.json({limit:"16kb"}))

//1 more configuration for url encoded
//this is for url data
app.use(express.urlencoded({extended:true , limit:
    "16kb"
}))

//static stores all the file folders 
//public 
app.use(express.static("public"))

app.use(cookieParser()) 

export {app}