const NoticeModel = require('./../mongo/notice')
const ModelUtil = require('./../utils/model')

exports.createNotice = async (req, res) => {
    const { title, message } = req.body;
    const userId = req.user_session._id;

    ModelUtil.duplicateTitleCheck(res, title, NoticeModel, async () => {
        const notice = await NoticeModel.create({
            title,
            message,
            sender: userId,
            time: new Date().getTime()
        })
        res.status(201).json(notice)
    })

}

exports.getNotices = async (req, res) => {
    NoticeModel.find().populate("sender", "name email _id").exec((err, notices) => {
        res.status(200).json(notices)
    })
}

exports.getNotice = async (req, res) => {
    const { id } = req.params
    NoticeModel.findOne({
        _id: id
    }).populate("sender", "name email _id").exec((err, notices) => {
        res.status(200).json(notices)
    })
}

exports.updateNotice = async (req, res) => {

    const noticeId = req.params.id;
    const { title, message } = req.body;

    ModelUtil.duplicateTitleCheck(res, title, NoticeModel, async () => {
        const notice = await NoticeModel.findOne({
            _id: noticeId,
        })

        notice.title = title;
        notice.message = message;

        notice.save();
        res.status(200).json(notice)
    })

}