//this is just a method and export
const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
 }



export {asyncHandler}

//higher order functions:
//functions which accept the fucntions as a parameter
// or can even return them
// normally: const asyncHandler = () => { }
// returning the funciton as a parameter
//const asyncHandler = (func) => { () => {} }


//this is just a wrapper function
//this will be used everwhere in the code

// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }