var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cell = require('./tableElementCellModel');


var tableSchema = new mongoose.Schema({
    //cascade delete cells
    order: Number,

    page: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    },
    cells: [{
        type: Schema.Types.ObjectId,
        ref: 'Cell'
    }]

});
tableSchema.post('remove', function (doc) {
    Cell.remove({ table: doc.id }, function (err) {
        if (err) throw err;
    });
});
module.exports = mongoose.model('Table', tableSchema);

