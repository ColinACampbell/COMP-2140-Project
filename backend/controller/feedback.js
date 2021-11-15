const Feedback = require('./../mongo/feedback');

exports.createFeedback = (req,res) => {
    const { message , title } = req.body;
    res.status(200).json({})
}