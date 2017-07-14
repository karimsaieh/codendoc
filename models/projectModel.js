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

module.exports = mongoose.model('Project', projectSchema);