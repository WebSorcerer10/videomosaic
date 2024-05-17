//we make this file to standardize 
//all the errors

class apierror extends Error{
    constructor(
      statusCode,
      message= "Something went wrong",
      errors = [],
      stack=""  
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors

        //no need of this code 
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.
                constructor
            )
        }
    }
    //in the curly braces we are overwriting
    //the constructor
}

export {apierror}