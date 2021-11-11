const User = require('./../mongo/user')
const passwordUtil = require('./../utils/password')
const jwtUtil = require('./../utils/jwt')

exports.authenticate = (req, res) => {
    
}

exports.register = (req, res) => {
    const { email, name, password } = req.body;
    // find if email first
    User.exists({ email }, async (err, exisits) => {
        if (exisits)
            res.status(409).json({})
        else {
            const hashedPassword = passwordUtil.createPasswordHash(password)
            const user = await User.create({ email, name, password: hashedPassword })
            user.password = undefined
            const token = jwtUtil.createToken({ ...user })
            res.status(201).json({ user, token })
        }
    })
}