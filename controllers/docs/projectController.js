var mongoose = require('mongoose');
var async = require('async');

var projectController = function (Project) {

    var findByName = function (req, res) {

        async.waterfall([
            function (callback) {
                Project.findOne({ name: req.params.name }, function (err, project) {
                    if (err) throw err;
                    if (project != null)
                        callback(null, project);
                    else
                        callback('project Not found');
                });
            },
            function (project, callback) {

                mongoose.model('Category').find({ project: project.id }, function (err, categories) {
                    callback(null, project, categories);
                });
            },
            function (project, categories, callback) {
                var pages = [];
                async.forEach(categories, function (category, FeCallback) {
                    mongoose.model('Page').find({ category: category.id }, function (err, pagesResult) {
                        pagesResult.forEach(function(page) {
                            page.category=category;  
                            pages.push(page); 
                        });
                        FeCallback();
                    });

                }, function () {
                    callback(null, project, categories, pages);
                });
            }
        ], function (err, project, categories, pages) {
            if (err)
                res.status(500).send(err);
            else
                res.json({ project, categories, pages });
        });
    };

    return {
        findByName: findByName,
    };
};

module.exports = projectController;