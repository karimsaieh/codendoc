
var express = require('express');

var routes = function (Page) {

    var feedbackController = require('../../controllers/docs/feedbackController')(Page);
    var feedbackRouter = express.Router();

    feedbackRouter.route('/')
        .post(feedbackController.save);

    return feedbackRouter;
};

module.exports = routes;