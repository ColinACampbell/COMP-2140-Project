const multer = require("multer");
const fs = require("fs");
const assetModel = require("../mongo/asset");
//const {mangoose }= require("mangoose");
exports.getAssets = (req, res) => {
    console.log(res.user_session)
    res.status(200).json({
        assets :[]
    })
}
exports.uploadAsset = (req,res) =>{
    // SET STORAGE
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })

    const upload = multer({storage: storage});
    let asset = {
        // attributes of the document and should correspond with mango
        file: req.body.encodedFile,
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        sender: req.body.sender,
        link: req.body.link,
        recepient: req.body.recepient

    }

        assetModel.create(asset,function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log("Saved To database");
                res.send(asset);
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
