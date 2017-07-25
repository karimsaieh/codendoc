var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cellSchema = new mongoose.Schema({
   
    row: Number,
    col: Number,
    value: String,

    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table'
    },
});
module.exports = mongoose.model('Cell', cellSchema);