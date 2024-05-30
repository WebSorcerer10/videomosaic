//resuable code
import { v2 as cloudinary} from "cloudinary";
import { createVerify } from "crypto";
import fs, { appendFile } from "fs"
//fs is file system in node js
//reead wrrite open a file we use fs
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => { 
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file had been uploaded successfully
        // console.log("file is uploaded on cloudinary",
            // response.url);
            fs.unlinkSync(localFilePath)
        
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        //remove the locally saved temporary
        //file as the upload operation got 
        //failed
        return null;
    }
 }

 export {uploadOnCloudinary}

