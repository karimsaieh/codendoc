
var express = require('express');

var routes = function (User) {

    var userController = require('../controllers/userController')(User);
    var userRouter = express.Router();

    //routes
    userRouter.route('/')
        .get(userController.detail)
        .put(userController.update)
        .patch(userController.patch)
        .delete(userController.destroy);

    return userRouter;
};

module.exports = routes;