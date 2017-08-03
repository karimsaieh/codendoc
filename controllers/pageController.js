var async = require('async');
var Header = require('../models/headerElementModel');
var Callout = require('../models/calloutElementModel');
var CodeSample = require('../models/codeSampleElementModel');
var CustomHtml = require('../models/customHtmlElementModel');
var Table = require('../models/tableElementModel');
var Cell = require('../models/tableElementCellModel');
var TextEditor = require('../models/textEditorElementModel');

var pageController = function (Page) {

    var updateOrder = function (req, res) {
        req.body.forEach(function (page) {
            Page.update(
                { _id: page._id },
                { $set: { 'order': page.order } },
                function (err) {
                    if (err)
                        res.status(500).send(err);
                });
        });
        res.status(200).send('pages order updated');
    };

    var list = function (req, res) {
        var projectPages = [];
        Page.find().populate('category')
            .exec(function (err, pages) {
                pages.forEach(function (page) {
                    if (page.category.project == req.query.projectId)
                        projectPages.push(page);
                });
                res.json(projectPages);
            });

    };

    var create = function (req, res) {
        var newPage = Page(req.body);//body conatins category id
        newPage.save(function (err, page) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).json(page);
            }
        });
    };

    var remove = function (req, res) {
        //test: if page has no subpages // time consuming tbh
        Page.findById(req.params.pageId, function (err, page) {
            page.remove(function (err) {//the only way to fire the remove hook
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send('page deleted');
            });
        });
    };

    var update = function (req, res) {
        var pageId = req.params.pageId;
        var elements = req.body.elements;
        var pageName = req.body.page.name;
        Page.update(
            { _id: pageId },
            { $set: { 'name': pageName } },
            function (err) {
                if (err)
                    res.status(500).send(err);
            });
        async.waterfall([
            function (callback) {
                Header.remove({ page: pageId }, function (err) {
                    if (err)
                        throw err;
                    callback(null, 'done');
                });
            },
            function (arg1, callback) {
                TextEditor.remove({ page: pageId }, function (err) {
                    if (err)
                        throw err;

                    callback(null, 'done');
                });
            },
            function (arg1, callback) {
                Table.find({ page: pageId }, function (err, tables) {
                    async.forEachOf(tables, function (table, key, feCallback) {
                        table.remove(function () { //to trigger remove hook
                            feCallback();
                        });
                    }, function () {
                        callback(null, 'done');
                    });
                });
            },
            function (arg1, callback) {
                CodeSample.remove({ page: pageId }, function (err) {
                    if (err)
                        throw err;
                    callback(null, 'done');
                });
            },
            function (arg1, callback) {
                Callout.remove({ page: pageId }, function (err) {
                    if (err)
                        throw err;
                    callback(null, 'done');
                });
            },
            function (arg1, callback) {
                CustomHtml.remove({ page: pageId }, function (err) {
                    if (err)
                        throw err;
                    callback(null, 'done');
                });
            }
        ], function (err, result) {
            elements.forEach(function (element) {
                element.data.page = pageId;
                switch (element.type) {
                    case 'header':
                        Header.create(element.data, function (err) {
                            if (err)
                                throw err;
                        });
                        break;
                    case 'textEditor':
                        TextEditor.create(element.data, function (err) {
                            if (err)
                                throw err;
                        });
                        break;
                    case 'codeSample':
                        CodeSample.create(element.data, function (err) {
                            if (err)
                                throw err;
                        });
                        break;
                    case 'callout':
                        Callout.create(element.data, function (err) {
                            if (err)
                                throw err;
                        });
                        break;
                    case 'table':
                        Table.create({ order: element.data.order, page: pageId }, function (err, table) {
                            if (err)
                                throw err;
                            element.data.cells.forEach(function (cell) {
                                cell.table = table.id;
                                Cell.create(cell, function (err) {
                                    if (err)
                                        throw err;
                                });
                            });
                        });
                        break;
                    case 'customHtml':
                        CustomHtml.create(element.data, function (err) {
                            if (err)
                                throw err;
                        });
                        break;
                    default:
                        break;
                }
            });
            res.send({ msg: 'done' });
        });
    };
    //authorisation needed ...
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
        list: list,
        updateOrder: updateOrder,
        create: create,
        remove: remove,
        update: update,
        getById: getById,
    };
};

module.exports = pageController;