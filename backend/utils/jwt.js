const jwt = require('jsonwebtoken')

const secret = "Damn, that's what 19##*@( expected"

exports.createToken = (payload) => {
    return jwt.sign(payload,secret)
}

exports.isTokenValid = (token) => {
    return jwt.verify(token,secret)
}