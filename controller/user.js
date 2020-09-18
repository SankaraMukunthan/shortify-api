const userValidation = require('../validation/user');
const UserModel = require('../models/user');
const bcryptJs = require('bcryptjs');
const User = require('../models/user');
const { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/user');
require('dotenv').config();

const userController = {
    async signup (req,res) {
        try {
             //validate object  
         const {error, value} = userValidation.validateSchema(req.body);
         if(error && error.details) {
            res.status(400).json(error);
         }
         
    
        //encrypt the pwd
    
        //create new user
        const user = await UserModel.create(value);
        return res.json({success:true,message:'user created successfully'});
        
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
    async login(req,res) {
        try {
            //validate object
        const {error, value} = userValidation.loginValidation(req.body);
         if(error && error.details) {
           return res.status(400).json(error);
         }
         // check if user is available
         const user =await User.findOne({emailId:value.emailId});
         if(!user){
            return res.status(BAD_REQUEST).json({err: 'invalid email or password'});
         }

         //passsword comparison
         const matched = bcryptJs.compare(value.pwd, user.pwd);
         if(!matched){
            return res.status(UNAUTHORIZED).json({err:'Invalid password'})
         }
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
         return res.json({success:true, token:token});
         
        
        } catch (error) {
            console.error(error);
            res.status(INTERNAL_SERVER_ERROR).json(error);
        }
    },
    async profile(req, res){
        const {id } = req.params;
        User.findById(id).then(user => {
            if(!user){
               return res.status(NOT_FOUND).json({err:'could not find user'});
            }
            return res.json(user);
        });
    },
    async test(req,res) {
        return res.json(req.user);
    }


}

module.exports = userController;