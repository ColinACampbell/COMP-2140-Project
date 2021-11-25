const NoticeModel = require('./../mongo/notice')

exports.createNotice = async (req,res) => {
    const {title, message} = req.body;
    const userId = req.user_session._id;
    const notice = await NoticeModel.create({
        title,
        message,
        sender: userId,
        time: new Date().getTime()
    })
    res.status(201).json(notice)
}

exports.getNotices = async (req,res) => {
    NoticeModel.find().populate("sender","name email _id").exec((err,notices)=>{
        res.status(200).json(notices)
    })
}

exports.getNotice = async (req,res) => {
    const {id} = req.params
    NoticeModel.findOne({
        _id : id
    }).populate("sender","name email _id").exec((err,notices)=>{
        res.status(200).json(notices)
    })
}