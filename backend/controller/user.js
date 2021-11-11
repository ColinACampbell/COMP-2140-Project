const User = require('./../mongo/user')
const passwordUtil = require('./../utils/password')
const jwtUtil = require('./../utils/jwt')

exports.authenticate = (req, res) => {

}

exports.register = async (req, res) => {
    const { email, name, password } = req.body;
    // find email first
    const hashedPassword = passwordUtil.createPasswordHash(password)

    const user = await User.create({ email, name, password: hashedPassword })

    user.password = undefined

    console.log(user)

    const token = jwtUtil.createToken({...user})

    res.status(201).json({user,token})
}