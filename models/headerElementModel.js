var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var headerSchema = new mongoose.Schema({

    value: String,
    order: Number,

    page: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    },

});
module.exports = mongoose.model('Header', headerSchema);