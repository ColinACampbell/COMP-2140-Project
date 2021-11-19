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

    crypto.randomBytes(48, (err, buffer) => {
        const tokenLink = buffer.toString("hex");
        let asset = {
            // attributes of the document and should correspond with mango
            file: req.body.encodedFile, // base64 format
            type: req.body.type,
            title: req.body.title,
            description: req.body.description,
            sender: req.body.sender, // the id of the sender
            link: tokenLink, // this should be auto generated
            recepient: req.body.recepient // the id of the recipient
        }
        Asset.create(asset, function (err, result) {
            if (err) {
                if (err) throw err;
                res.status(500).json({})
            } else {
                res.status(201).json({}); // Send the '201' status code to let the user/client know the operation was successful
            }
        })
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
