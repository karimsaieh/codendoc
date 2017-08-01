
var express = require('express');

var routes = function (Page) {

    var feedbackController = require('../controllers/feedbackController')(Page);
    var feedbackRouter = express.Router();

    feedbackRouter.route('/')
        .get(feedbackController.findByPage);

    return feedbackRouter;
};

module.exports = routes;