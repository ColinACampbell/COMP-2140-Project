const { Schema, model } = require("mongoose");
const mongooseConn = require('./index')

const assetStatusHistorySchema = new Schema({
    status:String,
    time: Number,
    updatedBy:{type:Schema.Types.ObjectId,ref:'User'}
})

const assetSchema = new Schema({
    fileData: String,
    type: String,
    title: String,
    description: String,
    assetLink: String,
    reviewBy: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    history : [assetStatusHistorySchema],
    status: String,
    // reviewedBy: String // is a date  Omit because you have reviewBy at the top
})

//exports.AssetStatusHistory = mongooseConn.model('AssetStatusHistory',assetStatusHistorySchema)
exports.Asset = mongooseConn.model('Asset',assetSchema)
