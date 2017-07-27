
var express = require('express');

var routes = function (Category) {

    var categoryController = require('../controllers/categoryController')(Category);
    var categoryRouter = express.Router();

    //routes
    categoryRouter.route('/')
        .get(categoryController.list)
        .post(categoryController.create)
        .put(categoryController.updateOrder);//update the order

    //routes
    categoryRouter.route('/:categoryId')
        .patch(categoryController.updateName)//updating the name 
        .delete(categoryController.remove);

    return categoryRouter;
};

module.exports = routes;