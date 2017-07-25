var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customHtmlSchema = new mongoose.Schema({
   
    code: String,
    order: Number,

    page: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    },

});
module.exports = mongoose.model('CustomHtml', customHtmlSchema);