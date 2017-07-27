
exports.errorHelper = function (err) {
    //If it isn't a mongoose-validation error, just throw it.
    if (err.name !== 'ValidationError') return err;
    var messages = {
        'required': '%s is required.',
        'min': '%s below minimum %d.',//not tested yet 
        'max': '%s above maximum %d.',//not tested yet
        'enum': '%s not an allowed value.',
        'minlength': '%s below minimum length %d.',
        'maxlength': '%s above maximium length %d. ',
    };

    var errors = {};

    //nb: mongoose returns one validation message for each field even if we got 2 validation messages
    Object.keys(err.errors).forEach(function (field) {
        var vObj = err.errors[field].properties;
        //====>
        //mongoose hardcode the type field : can"t change it , so we're doing it the hard way
        if (vObj.type == 'user defined') {//we'll pull out the message defined in the models
            errors[vObj.path] = vObj.message;
        }//<====
        else if (!messages.hasOwnProperty(vObj.type)) {
            errors[vObj.path] = 'please define an error message for this type of errors';
        }
        else {
            if (vObj.minlength || vObj.maxlength || vObj.min || vObj.max) {
                var numberAllowed = vObj.minlength || vObj.maxlength || vObj.min || vObj.max;
                console.log(numberAllowed + typeof (numberAllowed));
                errors[vObj.path] = require('util').format(messages[vObj.type], vObj.path, numberAllowed);
            } else {
                errors[vObj.path] = require('util').format(messages[vObj.type], vObj.path);
            }

        }
    });

    return errors;
};
