// Middlewares sit between the http requests and the business logic
// We can process information before we send them off to the business logic

const jwtUtil = require('./../utils/jwt')

// This function is used to check if a jwt is valid (if send) as well as decode it
exports.jwtCheck = (req, res, next) => {
    const { token } = req.body;

    if (token === undefined)
        res.status(401).json({message:"No User Session"})
    else {
        jwtUtil.isTokenValid(token).then((token) => {
            console.log(token)
            req.user_session = jwtUtil.decodeToken(token) // pass on the user information so it can be accessed in the controllers (layered approach)
            next()
        }).catch(err=>{
            res.status(401).json({
                message: "Not Valid Token"
            })
        })
    }
}