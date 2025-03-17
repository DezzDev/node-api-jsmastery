const errorMiddleware = (err, _ ,res, next) =>{
  try {
   
    let error = { ...err };
    // console.log({error});
    error.message = err.message;

    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found`;
      error = new Error(message);
      error.statusCode = 404;
    }

    // mongoose duplicate key
    if (err.code === 11000) {
      const message = `Duplicate field value entered`;
      error = new Error(message);
      error.statusCode = 400;
    }

    // mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({success:false, error: error.message || "Server Error"})

  } catch (error) {
    // pass error to next 
    next(error)
  }
}

export default errorMiddleware;