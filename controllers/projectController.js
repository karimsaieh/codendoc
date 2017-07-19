var projectController = function (Project) {

    var vmHelper = require('../helpers/ValidationMessagesHelper');

    var create = function (req, res) {
        var newProject = Project(req.body);
        newProject.user = req.user.id;
        newProject.save(function (err, project) {
            if (err) {
                res.status(500).send(vmHelper.errorHelper(err));
            } else {
                res.status(201).json(project);
            }
        });


    };


    var list = function (req, res) {
        Project.find({ user: req.user.id }, function (err, projects) {
            if (err)
                res.status(500).send(err);
            else
                res.json(projects);

        });
    };

    var findById = function (req, res) {
        Project.findById(req.params.id, function (err, project) {
            if (err)
                res.status(500).send(err);
            else {
                if (!project) {
                    return res.status(404).send('project not found');
                } else {
                    if (req.user.id != project.user)
                        return res.status(403).send('User is not authorized to access this project');
                    else
                        res.json(project);
                }
            }
        });
    };

    return {
        create: create,
        list: list,
        findById: findById
    };
};

module.exports = projectController;