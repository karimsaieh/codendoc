
var express = require('express');

var routes = function (Admin) {

    var adminController = require('../controllers/adminController')(Admin);
    var adminRouter = express.Router();

    //middlewares
    adminRouter.use('/:id', function (req, res, next) {
        Admin.findById(req.params.id, function (err, admin) {
            if (err)
                res.status(500).send(err);
            else if (admin) {
                req.admin = admin;
                next();
            } else {
                res.status(404).send('no admin found');
            }
        });
    });

    //routes
    adminRouter.route('/')
        .get(adminController.index)
        .post(adminController.store);

    adminRouter.route('/:id')
        .get(adminController.detail)
        .put(adminController.update)
        .patch(adminController.patch)
        .delete(adminController.destroy);

    return adminRouter;
}

module.exports = routes;