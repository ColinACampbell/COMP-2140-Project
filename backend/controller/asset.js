const crypto = require('crypto');
const Asset = require("../mongo/asset");
//const {mangoose }= require("mangoose");
exports.getAssets = (req, res) => {
    res.status(200).json({
        assets: []
    })
}

exports.getAsset = (req, res) => {
    // TODO : Implement
}

exports.uploadAsset = (req, res) => {

    console.log(req.user_session._id)
    const { assetLink, description, type, fileData, name, recipients } = req.body;

    const sender = req.user_session._id;

    let asset = {
        // attributes of the document and should correspond with mango
        fileData: fileData, // base64 format
        type, // Content type
        name,
        description: description,
        sender, // the id of the sender
        assetLink: assetLink, // The link to the asset
        recipients // array of id's of the recipients ['...','...']
    }
    Asset.create(asset, function (err, result) {
        if (err) {
            if (err) throw err;
            res.status(500).json({})
        } else {
            res.status(201).json({}); // Send the '201' status code to let the user/client know the operation was successful
        }
    })
}
// 1. get asset related to a user. i.e a person who sent the asset or in the receipent list.
// will be sending two list, senders and receivers.

/*exports.getAsset = (req,res)=>{
    assetJson = assetModel;
    fetchData:function(callback){
        const assetData=assetJson.find({})
        assetData.exec(function(err, data){
            if(err) throw err;
            return callback(data);
        })
        res.render('json',{assetData:data});
    }
}*/
