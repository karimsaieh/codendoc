var userController = function (User) {

    var vmHelper = require('../helpers/ValidationMessagesHelper');

    var detail = function (req, res) {
        res.json(req.user);//req.user is set by passport middleware
    };

    var patch = function (req, res) {
        for (var attribute in req.body) {
            if (attribute != '_id' && attribute != '__v')
                req.user._doc[attribute] = req.body[attribute];
        }
        User.update({ _id: req.user._id }, req.user, { runValidators: true, context: 'query' }, function (err) {
            if (err)
                res.status(500).send(vmHelper.errorHelper(err));
            else
                res.status(200).send(req.user);
        });
    };

    var destroy = function (req, res) {
        req.user.remove(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.status(204).send('Removed');
            }
        });
    };

    return {
        detail: detail,
        patch: patch,
        destroy: destroy
    };
};

module.exports = userController;