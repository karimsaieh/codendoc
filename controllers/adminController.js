var adminController = function (Admin) {

    var store = function (req, res) {
        var admin = new Admin(req.body);
        admin.save(function (err) {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send(admin);
        });
    }

    var index = function (req, res) {
        Admin.find(function (err, admins) {
            if (err)
                res.status(500).send(err);
            else
                res.json(admins);
        });
    }

    var detail = function (req, res) {
        res.json(req.admin);
    }

    var update = function (req, res) {
        //mongoose#update doesn't trigger validation
        for (attribute in req.admin._doc) {
            if (attribute.localeCompare('_id') != 0 && attribute.localeCompare('__v') != 0)
                req.admin._doc[attribute] = req.body[attribute];
        }
        admin = new Admin(req.admin);
        admin.save(function (err) {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send(admin);
        });
    }

    var patch = function (req, res) {
        for (attribute in req.body) {
            if (attribute.localeCompare('_id') != 0 && attribute.localeCompare('__v') != 0)
                req.admin._doc[attribute] = req.body[attribute];
        }
        admin = new Admin(req.admin);
        admin.save(function (err) {
            if (err)
                res.status(500).send(err);
            else
                res.status(201).send(admin);
        });
    }

    var destroy = function (req, res) {
        req.admin.remove(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.status(204).send('Removed');
            }
        });
    }

    return {
        store: store,
        index: index,
        detail: detail,
        update: update,
        patch: patch,
        destroy: destroy
    }
}

module.exports = adminController;