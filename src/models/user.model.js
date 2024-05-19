import mongoose,{Schema} from "mongoose";

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowecase: true,
            trim: true,
            //whenver we want to enable
            //searching field in any field
            //then its index we make it
            //as true (more optimised)
            index: true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowecase: true,
            trim: true, 
            
        },
        fullname:{
            type:String,
            required:true,
            unique:true,            
            trim: true,            
            index:true
        },
        avatar:{
            type:String,//cloudinary url
            required: true,            
        },
        coverImage:{
            type:String,//cloudinary url
            // required: true,     
        },
        //handling multiple objects through array

        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            requried:[true,'Password is required']
        },
        refreshToken:{
            type:String,
        }
    },
    {
        timestamps: true
    }

)

export const User= mongoose.model("User",userSchema)