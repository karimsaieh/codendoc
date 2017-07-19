
var express = require('express');

var routes = function (Project) {

    var projectController = require('../controllers/projectController')(Project);
    var projectRouter = express.Router();

    //routes
    projectRouter.route('/')
        .get(projectController.list)
        .post(projectController.create);
        //project patch ,don't allow patching user

    projectRouter.route('/:id')
        .get(projectController.findById);

    return projectRouter;
};

module.exports = routes;