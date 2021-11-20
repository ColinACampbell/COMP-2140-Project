const { Schema, model } = require("mongoose");
const mongooseConn = require('./index')

const assetSchema = new Schema({
    fileData: String,
    type: String,
    title: String,
    description: String,
    assetLink: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = mongooseConn.model('Asset',assetSchema)
