import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}
    /${DB_NAME}`);
    console.log(`\n MONGODB connected!! 
    DB HOST: ${connectionInstance.connection.host}`);
    //mongodb ka url jha pr connection ho rha hai vo le rha hai
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export default connectDB