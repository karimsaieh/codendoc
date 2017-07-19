var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 500
    },
    order: {
        type: Number,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    pages: [{
        type: Schema.Types.ObjectId,
        ref: 'Page'
    }]
});


categorySchema.pre('save', function (next) {
    var category = this;
    mongoose.model('Category', categorySchema)
        .findOne({ project: category.project }).sort({ order: -1 })
        .exec(function (err, x) {
            if (!x)
                category.order = 0;
            else
                category.order = x.order + 1;

            return next();
        });
});

categorySchema.post('remove', function (doc) {
    console.log('%s has been removed', doc._id);
    mongoose.model('Category', categorySchema)
        .find({ 'order': { $gt: doc.order },project:doc.project })
        .exec(function (err, categories) {
            categories.forEach(function (category) {
                mongoose.model('Category', categorySchema).update(
                    { _id: category._id },
                    { $set: { 'order': category.order - 1 } },
                    function (err) {
                        if (err) throw err;
                    });
            });
        });
});

module.exports = mongoose.model('Category', categorySchema);