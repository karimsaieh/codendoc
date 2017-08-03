var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new mongoose.Schema({
    value: String,//enum Up, Down
    page: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);