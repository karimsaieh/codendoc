var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new mongoose.Schema({
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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    parentPage: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    },
    subPages: [{
        type: Schema.Types.ObjectId,
        ref: 'Page'
    }]
});


pageSchema.pre('save', function (next) {
    var page = this;
    var query = {};
    if (this.parentPage == undefined)
        query = { category: page.category,parentPage:undefined };
    else
        query = { parentPage: page.parentPage };
    mongoose.model('Page', pageSchema)
        .findOne(query).sort({ order: -1 })
        .exec(function (err, x) {
            if (!x)
                page.order = 0;
            else
                page.order = x.order + 1;
            next();
        });

});


pageSchema.post('remove', function (doc) {
    if (!doc.parentPage) {
        mongoose.model('Page', pageSchema)
            .find({ 'order': { $gt: doc.order }, category: doc.category,parentPage:undefined })
            .exec(function (err, pages) {
                pages.forEach(function (currentPage) {
                    mongoose.model('Page', pageSchema).update(
                        { _id: currentPage.id },
                        { $set: { 'order': currentPage.order - 1 } },
                        function (err) {
                            if (err) throw err;
                        }
                    );
                });
            });
    } else {
        mongoose.model('Page', pageSchema)
            .find({ 'order': { $gt: doc.order }, parentPage: doc.parentPage })
            .exec(function (err, pages) {
                pages.forEach(function (currentPage) {
                    mongoose.model('Page', pageSchema).update(
                        { _id: currentPage.id },
                        { $set: { 'order': currentPage.order - 1 } },
                        function (err) {
                            if (err) throw err;
                        }
                    );
                });
            });
    }

});

module.exports = mongoose.model('Page', pageSchema);