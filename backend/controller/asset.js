const crypto = require('crypto');
const mailTransport = require('./../email')
const { Asset, AssetStatusHistory } = require("../mongo/asset");

exports.getAssets = async (req, res) => {

    const selectedFields = "assetLink description type name recipients sender title status reviewedBy"
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
    }).populate([{
        path: "history",
        populate: {
            path: "updatedBy",
            select: "name email _id"
        }
    }]).exec((err, asset) => {
        if (err || !asset) {
            console.log(err)
            res.status(400).json({
                message: "Looks Like Something when wrong"
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
        title: name,
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
            //mailTransport.sendEmail("prontobol@gmail.com","New Asset","You have a new asset")
            res.status(201).json({}); // Send the '201' status code to let the user/client know the operation was successful
        }
    })
}


exports.updateAsset = async (req, res) => {
    const userID = req.user_session._id;
    const assetId = req.params.id;

    const { status, assetLink, description, type, fileData, name, recipients, reviewedBy } = req.body;

    if (status == undefined || status == undefined)
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
        asset.title = name;
        asset.assetLink = assetLink;
        asset.description = description;
        asset.type = type;
        asset.fileData = fileData;
        asset.recipients = [];
        asset.recipients.push(recipients);
        asset.reviewdBy = reviewedBy;

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