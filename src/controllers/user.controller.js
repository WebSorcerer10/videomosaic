import { asyncHandler } from "../utils/asynchHandler.js";
import {apierror} from "../utils/apierror.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/Apiresponse.js";
const registerUser = asyncHandler( async( req, res) => {
    //get user details from frontend
    //validation -not empty
    // check if user already exist
    // check for images , check for avatar
    // upload them to cloudinary , avatar
    // create a user object - crete entry in ddb
    // remove password and refresh token field from response
    // check for user creation 
    // return response

    //request.body me data aa rha hai
    const {fullName,email,username,password}=req.body
    //  console.log("email: ", email);

    // if(fullName === ""){
    //     throw new apierror(400,"full name is required")
    // }
    //It performs basic validation to ensure that none
    // of the required fields 
    //(fullName, email, username, password) are empty. If any of these fields are empty, it throws an error with a status code of 400 and a message indicating that all fields are required.
    if(
        [fullName,email,username,password].some((field) =>
        field?.trim() === "")
    ){
        throw new apierror(400,"ALL fields are required")
    }


    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })
    
    if(existedUser){
        throw new apierror(409,"User with email or username already exists")
    }
    //console.log(req.files)
    //for files
    // check for images , check for avatar from the localpath
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath =req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new apierror(400,"Avatar file is required")
    }
    //upload the above on cloudinary
    //we write await because the video uploading
    //takes time
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apierror(400,"Avatar file is required")        
    }

    // create a user object - crete entry in ddb
    //interaction db with User imported

    const user= await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    const creratedUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!creratedUser){
        throw new apierror(500,"something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,creratedUser,"user registered succesfully")
    )

} )

export {
    registerUser
}