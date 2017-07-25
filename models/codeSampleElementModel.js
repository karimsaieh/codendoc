var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var codeSampleSchema = new mongoose.Schema({
   
    theme: String,
    language: String,
    code: String,
    order: Number,

    page: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    },

});
module.exports = mongoose.model('CodeSample', codeSampleSchema);