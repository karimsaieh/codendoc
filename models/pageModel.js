var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Header = require('./headerElementModel');
var Callout = require('./calloutElementModel');
var CodeSample = require('./codeSampleElementModel');
var CustomHtml = require('./customHtmlElementModel');
var Table = require('./tableElementModel');
var TextEditor = require('./textEditorElementModel');
var Feedback = require('./feedbackModel');

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
        query = { category: page.category, parentPage: undefined };
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
            .find({ 'order': { $gt: doc.order }, category: doc.category, parentPage: undefined })
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

    var pageId = doc.id;
    Header.remove({ page: pageId }, function (err) {
        if (err)
            throw err;
    });
    TextEditor.remove({ page: pageId }, function (err) {
        if (err)
            throw err;
    });
    Table.find({ page: pageId }, function (err, tables) {
        tables.forEach(function (table) {
            table.remove(function () { //to trigger remove hook
            });
        });
    });
    CodeSample.remove({ page: pageId }, function (err) {
        if (err)
            throw err;
    });
    Callout.remove({ page: pageId }, function (err) {
        if (err)
            throw err;
    });
    CustomHtml.remove({ page: pageId }, function (err) {
        if (err)
            throw err;
    });
    
    Feedback.remove({ page: pageId }, function (err) {
        if (err)
            throw err;
    });
});

module.exports = mongoose.model('Page', pageSchema);