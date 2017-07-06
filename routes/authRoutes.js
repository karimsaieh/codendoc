var express = require('express');

var routes = function (User) {

    var authController = require('../controllers/authController')(User);
    var authRouter = express.Router();

    //Routes
    authRouter.post('/register', authController.register);
    authRouter.post('/authenticate', authController.authenticate);

    return authRouter;
};
module.exports = routes;


