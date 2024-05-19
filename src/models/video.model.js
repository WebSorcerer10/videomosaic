import mongoose,{Schema} from "mongoose";

const videoSchema = new Schema(
    {
        videoFile:{
            type:String, //cloudinary url
            required:true
        },
        thumbnail:{
            type:String, 
            required:true
        },
        title:{
            type:String, 
            required:true
        },
        description:{
            type:String, 
            required:true
        },
        duration:{
            type: Number,
        }



    },
    {
        timestamps:true
    }
)

export const Video = mongoose.model("Video",videoSchema)