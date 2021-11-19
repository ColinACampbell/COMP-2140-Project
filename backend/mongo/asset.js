const { Schema, model } = require("mongoose");
const mongooseConn = require('./index')

const assetSchema = new Schema({
    file: String,
    type: String,
    title: String,
    description: String,
    link: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    recepient: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongooseConn.model('Asset',assetSchema)
