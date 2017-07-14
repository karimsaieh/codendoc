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
        Project.find({user:req.user.id},function (err, projects) {
            if (err)
                res.status(500).send(err);
            else
                res.json(projects);
                
        });
    };
     
    return {
        create: create,
        list:list,
    };
};

module.exports = projectController;