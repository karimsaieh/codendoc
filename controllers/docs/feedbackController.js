
var feedbackController = function (Feedback) {

    var save = function (req, res) {
        let newFeedback = req.body;
        Feedback.create(newFeedback, function (err) {
            if (err)
                throw err;
            else
                res.status(200).send({ msg: 'feedback submitted' });
        });
    };

    return {
        save: save,
    };
};

module.exports = feedbackController;