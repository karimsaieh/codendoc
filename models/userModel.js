var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var validator = require('validator');

var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        maxlength: 500
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
        //we put validation messages only for 'user defined' errors, cause you know  it's user defined
        //(mongoose default error messages are personalized in the helper)
        validate: [{ validator: value => validator.isEmail(value), msg: 'Invalid email.' }],
        minlength: 8,
        maxlength: 300
    }
});


userSchema.path('email').validate(
    {
        isAsync: true,
        validator: function (value, done) {
            var query ={};
            if(this.getUpdate)
            query = { email: value, _id: { $ne: this.getUpdate().$set._id }};
            else
            query={ email: value};

            mongoose.model('User', userSchema).findOne(query, function (err, user) {
                if (!user) {
                    return done(true);
                }
                done(false);
            });
        },
        message: 'Email already exists'
    }
);

userSchema.path('userName').validate(
    {
        isAsync: true,
        validator: function (value, done) {
            var query ={};
            if(this.getUpdate)
            query = { userName: value, _id: { $ne: this.getUpdate().$set._id }};
            else
            query={ userName: value};

            mongoose.model('User', userSchema).findOne(query, function (err, user) {
                if (!user) {
                    return done(true);
                }
                done(false);
            });
        },
        message: 'userName already exists'
    });

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);