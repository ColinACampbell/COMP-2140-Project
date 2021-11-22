const crypto = require('crypto');
const { Asset, AssetStatusHistory } = require("../mongo/asset");
//const {mangoose }= require("mangoose");
exports.getAssets = async (req, res) => {

    const selectedFields = "assetLink description, type, name, recipients, sender"
    const populateFields = [{
        path: "recipients",
        select: "name email _id"
    },
    {
        path: "sender",
        select: "name email _id"
    }, {
        path: "history",
        populate: {
            path: "updatedBy",
            select: "name email _id"
        }
    }];

    const userID = req.user_session._id;
    const sentAssets = await Asset.find({
        sender: userID
    }, selectedFields).populate(populateFields);

    const recievedAssets = await Asset.find({
        recipients: userID
    }, selectedFields).populate(populateFields)

    res.status(200).json({
        sent: sentAssets,
        recieved: recievedAssets
    })
}

exports.getAsset = (req, res) => {
    const assetID = req.params.id;
    Asset.findOne({
        _id: assetID
    }).populate({
        path: "history",
        populate: {
            path: "updatedBy",
            select: "name email _id"
        }
    }).exec((err, asset) => {
        if (err || !asset) {
            res.status(400).json({
                message: "Lookes Like Something when wrong"
            })
        } else {
            asset.fileData = undefined
            res.status(200).json(asset)
        }

    })
}

exports.uploadAsset = (req, res) => {

    console.log(req.user_session._id)
    const { assetLink, description, type, fileData, name, recipients, reviewedBy } = req.body;

    const sender = req.user_session._id;

    let asset = {
        // attributes of the document and should correspond with mango
        fileData: fileData, // base64 format
        type, // Content type
        name,
        description: description,
        sender, // the id of the sender
        assetLink: assetLink, // The link to the asset
        recipients, // array of id's of the recipients ['...','...']
        status: "submitted",
        reviewedBy
    }
    Asset.create(asset, async function (err, asset) {
        if (err) {
            if (err) throw err;
            res.status(500).json({})
        } else {
            asset.history.push({
                time: new Date().getTime(),
                status: "submitted",
                updatedBy: req.user_session._id
            })
            asset.save()
            res.status(201).json({}); // Send the '201' status code to let the user/client know the operation was successful
        }
    })
}


exports.changeAssetStatus = async (req, res) => {
    const userID = req.user_session._id;
    const assetId = req.params.id;
    const { status } = req.body;

    if (status == undefined || status == null)
        res.status(400).json({ message: "Invalid Status" })
    else {
        const asset = await Asset.findOne({
            _id: assetId,
        }).populate({
            path: "history",
            populate: {
                path: "updatedBy",
                select: "name email _id"
            }
        })
        asset.status = status;
        asset.history.push(
            {
                time: new Date().getTime(),
                status: status,
                updatedBy: userID
            })
        asset.save();
        asset.fileData = null;
        res.status(200).json(asset)
    }
}