var userController = function (User) {

    var detail = function (req, res) {
        res.json(req.user);//req.user is set by passport middleware
    };

    var update = function (req, res) {
        //mongoose#update doesn't trigger validation
        for (var attribute in req.user._doc) {
            if (attribute != '_id' && attribute != '__v')
                req.user._doc[attribute] = req.body[attribute];
        }
        var user = new User(req.user);
        user.save(function (err) {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send(user);
        });
    };

    var patch = function (req, res) {
        for (var attribute in req.body) {
            if (attribute != '_id' && attribute != '__v')
                req.user._doc[attribute] = req.body[attribute];
        }
        var user = new User(req.user);
        user.save(function (err) {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send(user);
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
        update: update,
        patch: patch,
        destroy: destroy
    };
};

module.exports = userController;