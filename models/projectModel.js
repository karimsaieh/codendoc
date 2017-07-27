var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    description:String,
    img: {
      type: String,
        required: true,
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

projectSchema.path('name').validate(
    {
        isAsync: true,
        validator: function (value, done) {
            var query ={};
            if(this.getUpdate)
            query = { name: value, _id: { $ne: this.getUpdate().$set._id }};
            else
            query={ name: value};

            mongoose.model('Project', projectSchema).findOne(query, function (err, project) {
                if (!project) {
                    return done(true);
                }
                done(false);
            });
        },
        message: 'Project already exists'
    });

    projectSchema.post('remove', function (doc) {
        mongoose.model('Category').find({project:doc._id},function (err,categories) {
            if(err) throw err;
            categories.forEach(function(category) {
                category.remove(function (err) {
                    if(err) throw err;  
                });
            }); 
        });
    });
module.exports = mongoose.model('Project', projectSchema);