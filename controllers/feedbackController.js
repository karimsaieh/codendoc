var async = require('async');
var feedbackController = function (Feedback) {

    var findByPage = function (req, res) {
        async.waterfall([
            function (callback) {
                Feedback.count({ page: req.query.pageId, value: 'Up' }, function (err, Ups) {
                    if (err) throw err;
                    callback(null, Ups);
                });
            },
            function (Ups, callback) {
                Feedback.count({ page: req.query.pageId, value: 'Down' }, function (err, Downs) {
                    if (err) throw err;
                    callback(null, Ups, Downs);
                });
            },
        ], function (err, Ups, Downs) {
            res.send({ Ups, Downs });
        });
    };

    return {
        findByPage: findByPage,
    };
};

module.exports = feedbackController;