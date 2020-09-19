const joi = require('joi');

const userValidation = {
    validateSchema(body) {
        const schema = joi.object().keys({
            emailId : joi.string().email().required(),
            pwd: joi.string().required(),
            firstName: joi.string().required(),
            lastName: joi.string().required()
        });
        const {error, value} = schema.validate(body);
        if(error && error.details){
            return {error};

        }
        return {value};

    },
    loginValidation(body) {
        const schema = joi.object().keys({
            emailId : joi.string().email().required(),
            pwd: joi.string().required(),
            
        });
        const {error, value} = schema.validate(body);
        if(error && error.details){
            return {error};

        }
        return {value};

    },
    forgotPasswordValidation(body){
        const schema = joi.object().keys({
            emailId :joi.string().email().required(),

        });
        const {error, value} = schema.validate(body);
        if(error && error.details){
            return {error};

        }
        return {value};

    }
}

module.exports = userValidation;
