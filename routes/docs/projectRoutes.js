
var express = require('express');

var routes = function (Project) {

    var projectController = require('../../controllers/docs/projectController')(Project);
    var projectRouter = express.Router();

    projectRouter.route('/:name')
        .get(projectController.findByName);

    return projectRouter;
};

module.exports = routes;