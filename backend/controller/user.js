const User = require('./../mongo/user')
const passwordUtil = require('./../utils/password')
const jwtUtil = require('./../utils/jwt')

exports.authenticate = (req, res) => {
    const { email, password } = req.body;

    if (email.length === 0 || password.length === 0) {
        res.status(400).json({})
        return;
    }

    const hashedPassword = passwordUtil.createPasswordHash(password)
    User.findOne({ email, password: hashedPassword }, (err, user) => {
        if (user) {
            user.password = undefined
            const token = jwtUtil.createToken({ ...user })
            res.status(200).json({ user, token })
        }
        else
            res.status(401).json({ message: "User not found or incorrect password" })
    })
}

exports.register = (req, res) => {
    const { email, name, password, position } = req.body;

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({});
        return;
    } else {
        User.exists({ email }, async (err, exisits) => {
            if (exisits)
                res.status(409).json({})
            else {
                const hashedPassword = passwordUtil.createPasswordHash(password)
                const user = await User.create({ email, name, password: hashedPassword, position })
                user.password = undefined
                const token = jwtUtil.createToken({ ...user })
                res.status(201).json({ user, token })
            }
        })
    }
}