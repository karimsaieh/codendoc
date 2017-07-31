var async = require('async');
var Header = require('../../models/headerElementModel');
var Callout = require('../../models/calloutElementModel');
var CodeSample = require('../../models/codeSampleElementModel');
var CustomHtml = require('../../models/customHtmlElementModel');
var Table = require('../../models/TableElementModel');
var Cell = require('../../models/tableElementCellModel');
var TextEditor = require('../../models/textEditorElementModel');


var pageController = function (Page) {

    var getById = function (req, res) {
        var elements = [];
        var pageId = req.params.pageId;
        var page = {};
        async.parallel([
            function (callback) {
                Page.findById(pageId, function (err, result) {
                    page = result;
                    callback(null, 'page');
                });
            },
            function (callback) {
                Header.find({ page: pageId }, function (err, headers) {
                    headers.forEach(function (header) {
                        elements.push({ type: 'header', data: header });
                    });
                    callback(null, 'headers');
                });
            },
            function (callback) {
                Callout.find({ page: pageId }, function (err, callouts) {
                    callouts.forEach(function (callout) {
                        elements.push({ type: 'callout', data: callout });
                    });
                    callback(null, 'callouts');
                });
            },
            function (callback) {
                CustomHtml.find({ page: pageId }, function (err, customHtmls) {
                    customHtmls.forEach(function (customHtml) {
                        elements.push({ type: 'customHtml', data: customHtml });
                    });
                    callback(null, 'customHtmls');
                });
            },
            function (callback) {
                CodeSample.find({ page: pageId }, function (err, codeSamples) {
                    codeSamples.forEach(function (codeSample) {
                        elements.push({ type: 'codeSample', data: codeSample });
                    });
                    callback(null, 'codeSamples');
                });
            },
            function (callback) {
                TextEditor.find({ page: pageId }, function (err, textEditors) {
                    textEditors.forEach(function (textEditor) {
                        elements.push({ type: 'textEditor', data: textEditor });
                    });
                    callback(null, 'textEditors');
                });
            },
            function (callback) {
                Table.find({ page: pageId }, function (err, tables) {
                    if (tables) {
                        async.forEachOf(tables, function (table, key, feCallback) {
                            Cell.find({ table: table }, function (err, cells) {
                                elements.push({ type: 'table', data: { order: table.order, cells: cells } });
                                feCallback();
                            });
                        }, function (err) {
                            if (err) console.error(err.message);
                            callback(null, 'tables');
                        });
                    }
                    else {
                        callback(null, 'tables_Empty');
                    }
                });
            }
        ],
            function (err, results) {
                res.send({ page: page, elements: elements });
            });

    };
    return {
        getById: getById,
    };
};

module.exports = pageController;