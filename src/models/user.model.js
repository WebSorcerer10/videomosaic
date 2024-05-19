import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
//jwt -
//bcrypt - for hashing the passwords

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
        fullName:{
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


//save is like event listener
//encryption is a complex process 
//so these functions are usually given async
//next is the middleware flag
//we can call this next
userSchema.pre("save" , async function (next) {
    if(!this.isModified("passowrd"))
        return next();
    this.password = bcrypt.hash(this.password , 10)
    next()
})


//checking the hash passwords
userSchema.methods.isPasswordCorrect= async function
(passowrd){
    //this returns true or false
   return await bcrypt.compare(passowrd,this.passowrd)
}

userSchema.methods.generateAccessToken= function() {
    return jwt.sign({
        //this._id come from database or schema
        _id:this._id,
        email:this.email,
        username: this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken= function() {
    return jwt.sign({
        //this._id come from database or schema
        _id:this._id,

    },
    process.env.REFERESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFERESH_TOKEN_EXPIRY
    }
)
}


export const User= mongoose.model("User",userSchema)