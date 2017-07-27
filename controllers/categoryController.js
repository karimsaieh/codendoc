var categoryController = function (Category) {

    var vmHelper = require('../helpers/ValidationMessagesHelper');

    var create = function (req, res) {
        var newCategory = Category(req.body);
        //security problem is it really your project ?
        //if newCategory.project in req.user.projects
        //--- is the  project id valid ? 
        newCategory.save(function (err, category) {
            if (err) {
                res.status(500).send(vmHelper.errorHelper(err));
            } else {
                res.status(201).json(category);
            }
        });
    };

    var updateOrder = function (req, res) {
        req.body.forEach(function (category) {
            Category.update(
                { _id: category._id },
                { $set: { 'order': category.order } },
                function (err) {
                    if (err)
                        res.status(500).send(err);
                });
        });
        res.status(200).send('categories order updated');
    };

    var list = function (req, res) {
        //security problem is it really your project ?
        Category.find(
            { project: req.query.projectId })
            .sort({ order: 1 })
            .exec(function (err, categories) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(categories);

            });
    };

    var updateName = function (req, res) {
        Category.update(
            { _id: req.params.categoryId },
            { $set: { 'name': req.body.name } },
            { runValidators: true, context: 'query' }
            , function (err) {
                if (err)
                    res.status(500).send(vmHelper.errorHelper(err));
                else
                    res.status(200).send({msg: 'category name updated'});
            });
    };

    var remove = function (req, res) {
        //test: if category has no pages // time consuming tbh
        Category.findById(req.params.categoryId, function (err, category) {
            category.remove(function (err) {//the only way to fire the remove hook
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send('category deleted');
            });
        });

    };

    return {
        create: create,
        list: list,
        updateName: updateName,
        updateOrder: updateOrder,
        remove: remove
    };
};

module.exports = categoryController;