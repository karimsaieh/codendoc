
var express = require('express');

var routes = function (Page) {

    var pageController = require('../controllers/pageController')(Page);
    var pageRouter = express.Router();

    //routes
    pageRouter.route('/')
        .get(pageController.list)
        .put(pageController.updateOrder)//updating the order
        .post(pageController.create);

     pageRouter.route('/:pageId')
     .delete(pageController.remove);
    //     .patch(pageController.update);

    return pageRouter;
};

module.exports = routes;