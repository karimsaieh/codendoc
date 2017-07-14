
var express = require('express');

var routes = function (Project) {

    var projectController = require('../controllers/projectController')(Project);
    var projectRouter = express.Router();

    //routes
    projectRouter.route('/')
        .get(projectController.list)
        .post(projectController.create);

    return projectRouter;
};

module.exports = routes;