var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var calloutSchema = new mongoose.Schema({
   
    title: String,
    body: String,
    type: String,
    order: Number,

    page: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    },

});
module.exports = mongoose.model('Callout', calloutSchema);