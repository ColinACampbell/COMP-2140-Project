const fs = require("fs");
const assetModel = require("../mongo/asset");
//const {mangoose }= require("mangoose");
exports.getAssets = (req, res) => {
    console.log(res.user_session)
    res.status(200).json({
        assets: []
    })
}
exports.uploadAsset = (req, res) => {
    // SET STORAGE
    //const upload = multer({storage: storage});
    console.log(req.body)
    let asset = {
        // attributes of the document and should correspond with mango
        file: req.body.encodedFile,
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        sender: req.body.sender, // the id of the sender
        link: req.body.link, // this should be auto generated
        recepient: req.body.recepient // the id of the recipient
    }
    assetModel.create(asset, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({})
        } else {
            console.log("Saved To database");
            res.send(201); // Send the '201' status code to let the user/client know the operation was successful
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
