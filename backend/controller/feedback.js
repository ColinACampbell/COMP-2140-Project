const {Feedback,FeedbackReply} = require('./../mongo/feedback');

exports.createFeedback = (req,res) => {
    const { message , title } = req.body;
    const user = req.user_session;
    if (message === undefined || title === undefined || message.length === 0 || title.length === 0)
        res.status(400).json({
            message:"Invalid Parameters"
        })
    else 
    {
        Feedback.create({postedBy:user._id,title,message})
        .then((feedback)=>{
            res.status(201).json(feedback) // return the owner too
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({
                message : "Looks Like Something Went Wrong"
            })
        })
    }
}

exports.getAllFeedbacks = (req,res) => {
    Feedback.find().populate("postedBy","name")
    .exec((err,posts)=>{
        res.status(200).json(posts)
    })
}

exports.getFeedback = (req,res) => {
    const feedbackId = req.params.id
    Feedback.findOne({
        _id : feedbackId
    }).populate("postedBy","name").exec((err,feedback)=>{
        if (feedback)
            res.status(200).json(feedback)
        else {
            res.status(400).json({message:"Not Found"})
        }
    })
}