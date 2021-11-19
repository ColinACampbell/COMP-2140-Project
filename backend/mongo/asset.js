const { Schema, model } = require("mongoose");
const mongooseConn = require('./index')

const assetSchema = new Schema({
    file: String,
    type: String,
    title: String,
    description: String,
    sender: String,
    link: String,
    recepient: String

})

module.exports = mongooseConn.model('Asset',assetSchema)
