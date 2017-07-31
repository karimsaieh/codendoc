
var express = require('express');

var routes = function (Page) {

    var pageController = require('../../controllers/docs/pageController')(Page);
    var pageRouter = express.Router();

    pageRouter.route('/:pageId')
        .get(pageController.getById);

    return pageRouter;
};

module.exports = routes;