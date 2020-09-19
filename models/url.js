const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    createdBy: String,
    date: { type: String, default:Date.now}

});
urlSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('url', urlSchema);