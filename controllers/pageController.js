var pageController = function (Page) {

    var updateOrder = function (req, res) {
        req.body.forEach(function (page) {
            Page.update(
                { _id: page._id },
                { $set: { 'order': page.order } },
                function (err) {
                    if (err)
                        res.status(500).send(err);
                });
        });
        res.status(200).send('pages order updated');
    };

    var list = function (req, res) {
        var projectPages = [];
        Page.find().populate('category')
            .exec(function (err, pages) {
                pages.forEach(function (page) {
                    if (page.category.project == req.query.projectId)
                        projectPages.push(page);
                });
                res.json(projectPages);
            });

    };

    var create = function (req, res) {
        var newPage = Page(req.body);//body conatins category id
        newPage.save(function (err, page) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).json(page);
            }
        });
    };

      var remove = function (req, res) {
        //test: if page has no subpages // time consuming tbh
       Page.findById(req.params.pageId, function (err, page) {
            page.remove(function (err) {//the only way to fire the remove hook
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send('page deleted');
            });
        });

    };

    return {
        list: list,
        updateOrder: updateOrder,
        create: create,
        remove:remove,
    };
};

module.exports = pageController;