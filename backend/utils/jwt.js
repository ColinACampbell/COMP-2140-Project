const jwt = require('jsonwebtoken')

const secret = "Damn, that's what 19##*@( expected"

exports.createToken = (payload) => {
    return jwt.sign(payload,secret)
}

exports.decodeToken = (token) => {
    return jwt.decode(token)
}

exports.isTokenValid = (token) => {

    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,function (error,decodedPayload){
            if (error)
                reject(error);
            else 
                resolve(decodedPayload)
        })
    })
     
}