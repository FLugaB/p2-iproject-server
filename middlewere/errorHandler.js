

const errorLog = (err, req, res, next) => {

    let code = 500
    let message = "Internal server error"

    if ( err.name === `SequelizeUniqueConstraintError` || 
         err.name === `SequelizeValidationError` ) {
         code = 400
         message = err.errors[0].message
    } else if (err.name === `JsonWebTokenError`) {
         code = 401
         message = message = err.errors[0].message
    } else if ( err.name === `USER_NOT_FOUND`||
                err.name === `ADMIN_NOT_FOUND`) {
        code = 401
        message = "Invalid email/password"
    } else if (err.name === `NO_TOKEN` || 
               err.name === `INVALID_TOKEN ` ){
         code = 401
         message = "Invalid token"
    } else if (err.name === `FORBIDDEN`){
         code = 403
         message = "Invalid access"
    } else if (     err.name === `PRODUCT_NOT_FOUND` || 
                    err.name === `NO_PRODUCT_TO_ADD`) {
         code = 404
         message = "Product not found"
    }

//     console.log(err)
    res.status(code).json({message})

}

module.exports = errorLog