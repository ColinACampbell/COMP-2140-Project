const { Schema, model } = require("mongoose");
const mongooseConn = require('./index')

const assetSchema = new Schema({
    owner_id: String,
    name : String,
    data : String
})

module.exports = mongooseConn.model('Asset',assetSchema)